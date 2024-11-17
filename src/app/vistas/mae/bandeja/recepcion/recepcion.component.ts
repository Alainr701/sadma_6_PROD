import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Correspondences } from '../../correspondencias/correspondencias.component';
import { AppService, SPersonas } from 'src/app/servicios/app.service';
import { CorrespondenciaService } from 'src/app/servicios/correspondencia.service';
import { FormDerivacionComponent } from 'src/app/shared/form-derivacion/form-derivacion.component';
import { ResponseI } from 'src/app/interfaces/response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HistorialApp } from '../entrada-c/entrada-c.component';


@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styleUrls: ['./recepcion.component.css']
})
export class RecepcionComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  correspondencias: Correspondences[] = [];
  selectedPersona: SPersonas | null= null;

  idPeronas = null;
    
 
  async ngOnInit() {
    let data = JSON.parse(sessionStorage.getItem('userData') || 'null');
    this.idPeronas = data.id_personas;
    let body= {
      "id_personas":this.appService.userData.id_personas,
      "estado":"ACEPTADO"
    }
    let res = await this.serviceCorrespondencia.obtenerCorrespondencia(body);
    this.correspondencias = res.data;
  }

  showDetails = false;

  toggleDetails(correspondence: Correspondences): void {
    correspondence.showDetails = !correspondence.showDetails;
  }


  toggleCollapse(correspondence: Correspondences) {
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

  selectedCorrespondence: Correspondences | null = null;
  // historialDataSource!: MatTableDataSource<Historial>;
  displayedColumns: string[] = ['id', 'remitente', 'fechaDerivacion', 'destinatario', 'fechaRecepcion', 'proveido', 'observacion', 'remision'];
  ngAfterViewInit() {
    // if (this.selectedCorrespondence && this.selectedCorrespondence.detalles.historial) {
    //   this.historialDataSource = new MatTableDataSource(this.selectedCorrespondence.detalles.historial);
    //   this.historialDataSource.paginator = this.paginator;
    //   this.historialDataSource.sort = this.sort;
    // }
  }
  constructor( private serviceCorrespondencia: CorrespondenciaService ,private appService: AppService,private modalService: NgbModal) {
  }
  listaHistorial: HistorialApp[] = [];
  async  showHistorial(correspondence: Correspondences) {
    this.selectedCorrespondence = correspondence;
    
    let body = {
      "id_hoja_de_ruta": correspondence.id_hoja_de_ruta
    }
    let data = await this.serviceCorrespondencia.getHistorial(body);
    this.listaHistorial = data.data;
    // const modalElement = document.getElementById('historialModal') as HTMLElement;
    // if (modalElement) {
    //   const modal = new (window as any).bootstrap.Modal(modalElement);
    //   modal.show();
    // }
  }

  pdfSrc = '';
  @ViewChild('pdfModals') pdfModal: any;
  async openPdfModal(correspondence: any) {

    let res: ResponseI = await this.serviceCorrespondencia.obtenerDoc({
      "id_hoja_de_ruta": correspondence.id_hoja_de_ruta
    });
    this.pdfSrc = res.data.doc64; 
   
  }
  descargar(pdfSrc: any) {
    const link = document.createElement('a');
    link.href = pdfSrc;
    link.download = 'documento.pdf';
    link.click();
}
  async getRemitente(correspondence: Correspondences){
    let body = {
      id_personas: correspondence.id_proveido_personas,
    }
    let res = await this.serviceCorrespondencia.buscarPersona(body);
    this.selectedPersona = res.data[0];
  }
  concluir(correspondence: Correspondences): void {
    Swal.fire({
      title: 'Concluir Correspondencia',
      input: 'textarea',
      inputLabel: 'Ingrese el motivo de la conclusion',
      inputPlaceholder: 'Escriba el motivo aquí...',
      inputAttributes: {
        'aria-label': 'Ingrese el motivo de la conclusion'
      },
      showCancelButton: true,
      confirmButtonText: 'Concluir',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      icon: 'error'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const razonConclusion = result.value;
        Swal.fire({
          title: 'Enviar a GAMEA o Concluir',
          text: '¿Desea concluir la correspondencia o enviarla a GAMEA?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Concluir',
          cancelButtonText: 'Enviar a GAMEA',
        }).then(async (result2) => {
          if (result2.isConfirmed) {
            let body = {
              "id_hoja_de_ruta": correspondence.id_hoja_de_ruta,
              "estado": 'CONCLUIDO',
              "observacion": razonConclusion,
            };
            let res = await this.serviceCorrespondencia.concluidoGamea(body);

            let resHistorial: ResponseI = await this.serviceCorrespondencia.
            aceptarDerivacionHistorial({ // esto guarda en el historial de derivaciones
              "id_personas": correspondence.id_personas,
              "id_hoja_de_ruta": correspondence.id_hoja_de_ruta,
              "estado": 'CONCLUIDO',
              "id_documento_save":  null,
              "id_proveido_personas": this.appService.userData.id_personas,
            })
      
            Swal.fire('¡Concluido!', 'Se ha concluido la correspondencia.', 'success');
          } else if (result2.dismiss === Swal.DismissReason.cancel) {
            let body = {
              "id_hoja_de_ruta": correspondence.id_hoja_de_ruta,
              "estado": 'DERIVADO_GAMEA',
              "observacion": razonConclusion,
            };
            let res = await this.serviceCorrespondencia.concluidoGamea(body);
            let resHistorial: ResponseI = await this.serviceCorrespondencia.
            aceptarDerivacionHistorial({ // esto guarda en el historial de derivaciones
              "id_personas": correspondence.id_personas,
              "id_hoja_de_ruta": correspondence.id_hoja_de_ruta,
              "estado": 'DERIVADO_GAMEA',
              "id_documento_save":  null,
              "id_proveido_personas": this.appService.userData.id_personas,
            })
            Swal.fire('¡Concluido!', 'Se ha concluido la correspondencia.', 'success');
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'La acción ha sido cancelada.', 'info');
      }
    });
    }
    async handleClose()
    {
      

    }


  sortData(sort: Sort) {
    // const data = this.selectedCorrespondence?.detalles.historial?.slice() || [];
    // if (!sort.active || sort.direction === '') {
    //   this.historialDataSource.data = data;
    //   return;
    // }

    // this.historialDataSource.data = data.sort((a, b) => {
    //   const isAsc = sort.direction === 'asc';
    //   switch (sort.active) {
    //     case 'id': return compare(a.id, b.id, isAsc);
    //     case 'remitente': return compare(a.remitente, b.remitente, isAsc);
    //     case 'fechaDerivacion': return compare(a.fechaDerivacion, b.fechaDerivacion, isAsc);
    //     case 'destinatario': return compare(a.destinatario, b.destinatario, isAsc);
    //     case 'fechaRecepcion': return compare(a.fechaRecepcion, b.fechaRecepcion, isAsc);
    //     case 'proveido': return compare(a.proveido, b.proveido, isAsc);
    //     case 'observacion': return compare(a.observacion, b.observacion, isAsc);
    //     case 'remision': return compare(a.remision, b.remision, isAsc);
    //     default: return 0;
    //   }
    // });
  }
  showModalVer:boolean =false;
  @ViewChild(FormDerivacionComponent) formDeriva!: FormDerivacionComponent;

  async derivar(correspondence: Correspondences) {
    this.showModalVer=true;
    //TODO REVISAR
    correspondence.usu_mod=null;
    this.serviceCorrespondencia.derivarCorrespondence= correspondence;
    await this.formDeriva.openModal();

    // this.formDeriva.closeModal();
    // let body= {
    //   "id_personas":this.appService.userData.id_personas,
    //   "estado":"CREADO"
    // }
    // let res = await this.serviceCorrespondencia.obtenerCorrespondencia(body);
    // this.correspondencias = res.data;
    // if (this.formDeriva) { 
    // } else {
    //   console.error('El componente formDeriva no está inicializado.');
   
    // }
  }
}
