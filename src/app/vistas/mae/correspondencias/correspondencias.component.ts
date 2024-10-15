import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

declare var bootstrap: any; 
import {MatTableDataSource} from '@angular/material/table';
import { CorrespondenciaService } from 'src/app/servicios/correspondencia.service';
import { AppService } from 'src/app/servicios/app.service';
import { FormDerivacionComponent } from 'src/app/shared/form-derivacion/form-derivacion.component';
import { ResponseI } from 'src/app/interfaces/response';

// interface Remitente{
//   id: number;
//   r: string;
//   dependencia:string;
//   cargo:string;
//   numero: string;
// }

interface Correspondences
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
  showDetails?: boolean;
  isCollapsed?: boolean;
}


@Component({
  selector: 'app-correspondencias',
  templateUrl: './correspondencias.component.html',
  styleUrls: ['./correspondencias.component.css']
})
export class CorrespondenciasComponent {

  
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor( private serviceCorrespondencia: CorrespondenciaService,private appService: AppService) {
  }
  showModalVer:boolean =false;

  openModal() {
    // Obtener la instancia del modal y mostrarlo
    const modal = new bootstrap.Modal(document.getElementById('nuevaCorrespondenciaModal')!);
    modal.show();
  }
  correspondencias: Correspondences[] = [];
  async ngOnInit() {
    let body= {
      "id_personas":this.appService.userData.id_personas,
      "estado":"CREADO"
    }
    let res = await this.serviceCorrespondencia.obtenerCorrespondencia(body);
    this.correspondencias = res.data;
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
  derivar(correspondence: Correspondences) {
    this.showModalVer=true;
    this.serviceCorrespondencia.derivarCorrespondence= correspondence;
    this.formDeriva.openModal();
    // if (this.formDeriva) { 
    // } else {
    //   console.error('El componente formDeriva no está inicializado.');
    // }
  }
  pdfSrc: string = ''; // Esta será la ruta o base64 del PDF que quieres mostrar

  async openPdfModal(correspondence: Correspondences) {
    let res: ResponseI = await this.serviceCorrespondencia.obtenerDoc({
      "id_hoja_de_ruta": correspondence.id_hoja_de_ruta
    });
  
    this.pdfSrc = res.data.doc64;  // Asignar el documento al embed
  
    const modalElement = document.getElementById('pdfModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);  // Inicializar el modal
      modal.show();  // Mostrar el modal
    }
  }
  
}

