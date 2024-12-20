import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Correspondences } from '../../correspondencias/correspondencias.component';
import { AppService, SPersonas } from 'src/app/servicios/app.service';
import { CorrespondenciaService } from 'src/app/servicios/correspondencia.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResponseI } from 'src/app/interfaces/response';
import { HistorialApp } from '../entrada-c/entrada-c.component';



@Component({
  selector: 'app-concluidos',
  templateUrl: './concluidos.component.html',
  styleUrls: ['./concluidos.component.css']
})
export class ConcluidosComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  correspondencias: Correspondences[] = [];
  selectedPersona: SPersonas | null= null;
  listaHistorial: HistorialApp[] = [];


  constructor( private serviceCorrespondencia: CorrespondenciaService ,private appService: AppService,private modalService: NgbModal) {
  }

  async ngOnInit(){
    let body= {
      "id_personas":this.appService.userData.id_personas,
      "estado":"CONCLUIDO",
      "estado2":"DERIVADO_GAMEA"
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


  desconcluir(correspondence: Correspondences): void {
    
    Swal.fire({
      title: '¿Desea desconcluir?',
      showCancelButton: true,
      input: 'textarea',
      confirmButtonText: 'Desconcluir',
      cancelButtonText: 'Cerrar',
      icon: 'warning',
      inputLabel: 'Ingrese el motivo de la conclusion',
      inputPlaceholder: 'Escriba el motivo aquí...',
      inputAttributes: {
        'aria-label': 'Ingrese el motivo de la conclusion'
      },
      reverseButtons: true,
    }).then( async (result) => {
      const razonConclusion = result.value;
      if (result.isConfirmed) {
        let body = {
          "id_hoja_de_ruta": correspondence.id_hoja_de_ruta,
          "estado": 'ACEPTADO',
          "observacion": razonConclusion,
        };
        let res = await this.serviceCorrespondencia.concluidoGamea(body);
        let resHistorial: ResponseI = await this.serviceCorrespondencia.
        aceptarDerivacionHistorial({ // esto guarda en el historial de derivaciones
          "id_personas": correspondence.id_personas,
          "id_hoja_de_ruta": correspondence.id_hoja_de_ruta,
          "estado": 'ACEPTADO',
          "id_documento_save":  null,
          "id_proveido_personas": this.appService.userData.id_personas,
        })
        Swal.fire('¡Concluido!', 'Se ha concluido la correspondencia.', 'success');
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
  async showHistorial(correspondence: Correspondences){
    this.selectedCorrespondence = correspondence;
    
    let body = {
      "id_hoja_de_ruta": correspondence.id_hoja_de_ruta
    }
    let data = await this.serviceCorrespondencia.getHistorial(body);
    this.listaHistorial = data.data
    // this.selectedCorrespondence = correspondence;
    // if (this.selectedCorrespondence && this.selectedCorrespondence.detalles.historial) {
    //   this.historialDataSource = new MatTableDataSource(this.selectedCorrespondence.detalles.historial);
    //   this.historialDataSource.paginator = this.paginator;
    //   this.historialDataSource.sort = this.sort;
    // }
    // const modalElement = document.getElementById('historialModal') as HTMLElement;
    // if (modalElement) {
    //   const modal = new (window as any).bootstrap.Modal(modalElement);
    //   modal.show();
    // }
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
  async getRemitente(correspondence: Correspondences){
    let body = {
      id_personas: correspondence.id_proveido_personas,
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
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

