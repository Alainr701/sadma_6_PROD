import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

declare var bootstrap: any; 
import {MatTableDataSource} from '@angular/material/table';
import { CorrespondenciaService } from 'src/app/servicios/correspondencia.service';
import { AppService, SPersonas } from 'src/app/servicios/app.service';
import { FormDerivacionComponent } from 'src/app/shared/form-derivacion/form-derivacion.component';
import { ResponseI } from 'src/app/interfaces/response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Documento } from './formulario/formulario.component';

export interface Correspondences
{
  id_hoja_de_ruta:any;
  codigo_interno:any;
  cite:any;
  referencia:any;
  observacion:any;
  descripcion:any;
  tipoDocumento:any;
  categoria:any;
  estado:any;
  fec_cre:any;
  fec_mod:any;
  usu_cre:any;
  usu_mod:any;
  id_personas:any;
  id_proveido_personas:any;
  showDetails?: boolean;
  isCollapsed?: boolean;
  historial?: HistorialDerivaciones;
}
export interface HistorialDerivaciones{
  id_historial_derivaciones?: number;
  id_personas: number;
  id_hoja_de_ruta: number;
  fecha_derivacion: Date;
  obs: string;
  fec_cre: Date;
  plazo_dias: number;
  proveido: string;
  estado: string;
  id_proveido_personas: number;
}


@Component({
  selector: 'app-correspondencias',
  templateUrl: './correspondencias.component.html',
  styleUrls: ['./correspondencias.component.css']
})
export class CorrespondenciasComponent {

  
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('nuevaCorrespondenciaModal') modalElement!: ElementRef;

  constructor( private serviceCorrespondencia: CorrespondenciaService,private appService: AppService, private modalService: NgbModal) {
  }
  showModalVer:boolean =false;
  doc:Documento|null = null;

  isOpenModal = false;
  openModal(correspondence: Correspondences|null) {
    this.isOpenModal = true;
    if (correspondence!=null) {
    this.doc = {
      referencia : correspondence.referencia,
      descripcion : correspondence.descripcion,
      observacion :  correspondence.observacion,
      cite : correspondence.cite,
      //TODO : REVISAR
      tipo :   '',
      categoria : correspondence.categoria,
      documento : '',
      usu_cre : correspondence.usu_cre,
      estado : correspondence.estado,
      id_documentos : '',
      id_personas : correspondence.id_personas,
    }
  }
  

    const modal = new bootstrap.Modal(document.getElementById('nuevaCorrespondenciaModal')!);
    modal.show();
  }
  correspondencias: Correspondences[] = [];
  async ngOnInit() {
    await this.getLista();
  }
  async getLista(){
    let body= {
      "id_personas":this.appService.userData.id_personas,
      "estado":"CREADO"
    }
    let res = await this.serviceCorrespondencia.obtenerCorrespondencia(body);
    this.correspondencias = res.data;
  }

  async cerrando(){
    this.isOpenModal = false;
    document.querySelector('.modal-backdrop')?.remove();
    await this.getLista();
   

  }

  toggleDetails(correspondence: Correspondences): void {
    correspondence.showDetails = !correspondence.showDetails;
  }

  toggleCollapse(correspondence: Correspondences): void {
    correspondence.isCollapsed = !correspondence.isCollapsed;
  }

  rechazar(correspondence: Correspondences): void {
    Swal.fire({
      title: 'Motivo de Rechazo',
      input: 'textarea',
      inputLabel: 'Ingrese el motivo del rechazo',
      inputPlaceholder: 'Escriba el motivo aquí...',
      inputAttributes: {
        'aria-label': 'Ingrese el motivo del rechazo'
      },
      showCancelButton: true,
      confirmButtonText: 'Rechazar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      icon: 'error'
    }).then((result) => {
      if (result.isConfirmed) {
        const razonRechazo = result.value; 
        Swal.fire('¡Rechazado!', 'La acción ha sido confirmada.', 'success');
        console.log('Acción rechazada para:', correspondence);
        console.log('Motivo de rechazo:', razonRechazo);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'La acción ha sido cancelada.', 'info');
      }
    });
  }

  @ViewChild(FormDerivacionComponent) formDeriva!: FormDerivacionComponent;

  async derivar(correspondence: Correspondences) {
    
    this.isModalVisibleDerivacion=true;
    correspondence.usu_mod=null;
    this.serviceCorrespondencia.derivarCorrespondence= correspondence;
    await this.formDeriva.openModal();

  }
  selectedPersona: SPersonas | null= null;

  async getRemitente(correspondence: Correspondences){
    let body = {
      id_personas: correspondence.id_personas,
    }
    let res = await this.serviceCorrespondencia.buscarPersona(body);
    this.selectedPersona = res.data[0];
  }
  
  pdfSrc = ''; // Asegúrate de tener el valor de `pdfSrc` que deseas mostrar.
  @ViewChild('pdfModal') pdfModal: any;

  async openPdfModal(correspondence: any) {
    
    let res: ResponseI = await this.serviceCorrespondencia.obtenerDoc({
      "id_hoja_de_ruta": correspondence.id_hoja_de_ruta
    });
    this.pdfSrc = res.data.doc64; 
    this.modalService.open(this.pdfModal, { size: 'lg', backdrop: 'static' });
  }
  
  descargar(pdfSrc: any) {
    const link = document.createElement('a');
    link.href = pdfSrc;
    link.download = 'documento.pdf';
    link.click();
}

isModalVisibleDerivacion:boolean=false;
async handleClose() {
  this.isModalVisibleDerivacion = false;
  console.log('Evento close recibido desde el componente hijo');
  await this.getLista();
  // Puedes realizar aquí cualquier otra acción que necesites al cerrar el formulario
}
}

