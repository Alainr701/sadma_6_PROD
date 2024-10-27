import { Component, Input, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Correspondences } from '../../correspondencias/correspondencias.component';
import { CorrespondenciaService } from 'src/app/servicios/correspondencia.service';
import { AppService, SPersonas } from 'src/app/servicios/app.service';
import { DerivationData } from 'src/app/shared/form-derivacion/form-derivacion.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResponseI } from 'src/app/interfaces/response';



@Component({
  selector: 'app-entrada-c',
  templateUrl: './entrada-c.component.html',
  styleUrls: ['./entrada-c.component.css'],
  
})

export class EntradaCComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() params: any; 

  correspondencias: Correspondences[] = [];
  selectedPersona: SPersonas | null= null;
  
  listaPersonas:SPersonas[]=[];
   formData: DerivationData = {
    dependency: '',
    reception: '',
    provider: '',
    observation: '',
    days: 1
  };

  listaHistorial: HistorialApp[] = [];
 

  constructor( private serviceCorrespondencia: CorrespondenciaService,private appService: AppService,private modalService: NgbModal) {
  }

  async ngOnInit() {
    let body= {
      "id_personas":this.appService.userData.id_personas,
      "estado":"DERIVADO",
       "estado2":"REMITIDO"
    }
    let res = await this.serviceCorrespondencia.obtenerCorrespondencia(body);
    this.correspondencias = res.data;
}

  showDetails = false;

  toggleDetails(correspondence: Correspondences): void {
    correspondence.showDetails = !correspondence.showDetails;
  }
    
  aceptar(correspondence: Correspondences): void {
    Swal.fire({
      title: '¿Desea continuar?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        let body= 
        {
          "id_personas": this.appService.userData.id_personas,
          "id_hoja_de_ruta":  correspondence.id_hoja_de_ruta,
          "estado": 'ACEPTADO',
          "id_proveido_personas": this.appService.userData.id_personas
        };
      let res =  await this.serviceCorrespondencia.aceptarDerivacion(body); 

        Swal.fire('¡Aceptado!', 'La acción ha sido confirmada.', 'success');
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'La acción ha sido cancelada.', 'info');
      }
    });
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        
        const razonRechazo = result.value;
        let body = {
          "id_personas": correspondence.id_proveido_personas,
          "id_hoja_de_ruta": correspondence.id_hoja_de_ruta,
          "estado": 'REMITIDO',
          "id_proveido_personas": this.appService.userData.id_personas,
          "observacion": razonRechazo,
        };
        let res = await this.serviceCorrespondencia.rechazarDerivacion(body);
        
        Swal.fire('¡Rechazado!', 'La opción ha sido rechazada.', 'success');
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

  async  showHistorial(correspondence: Correspondences) {
    this.selectedCorrespondence = correspondence;
    
    let body = {
      "id_hoja_de_ruta": correspondence.id_hoja_de_ruta
    }
    let data = await this.serviceCorrespondencia.getHistorial(body);
    this.listaHistorial = data.data;
    const modalElement = document.getElementById('historialModal') as HTMLElement;
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  async getRemitente(correspondence: Correspondences){
    let body = {
      id_personas: correspondence.id_personas,
    }
    let res = await this.serviceCorrespondencia.buscarPersona(body);
    this.selectedPersona = res.data[0];
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
  pdfSrc = ''; 
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
  
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export interface HistorialApp {
  apellido_destinatario: string;
  apellido_remitente: string;
  cargo_destinatario: string;
  cargo_remitente: string;
  fecha_derivacion: string;
  fecha_respuesta: string;
  nombre_destinatario: string;
  nombre_remitente: string;
  numerador: number;
  proveido: string;
  obs: string;
}


