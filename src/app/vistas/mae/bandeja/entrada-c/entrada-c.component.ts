import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

interface Historial {
  id: number;
  remitente: string;
  fechaDerivacion: string;
  destinatario: string;
  fechaRecepcion: string;
  proveido: string;
  observacion: string;
  remision: string;
}

interface Remitente{
  id: number;
  r: string;
  dependencia:string;
  cargo:string;
  numero: string;
}

interface Correspondence {
  id: number;
  codigo: string;
  plazo: string;
  fechaLimite: string;
  fechaDerivacion: string;
  
  detalles: {
    cite: string;
    accion: string;
    observacion: string;
    referencia: string;
    proveido: string;
    descripcion: string;
    historial?: Historial[]; 
    remitente?: Remitente[];
  };
  showDetails?: boolean;
}

@Component({
  selector: 'app-entrada-c',
  templateUrl: './entrada-c.component.html',
  styleUrls: ['./entrada-c.component.css'],
  
})
export class EntradaCComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  correspondences: Correspondence[] = [
    {
      id: 1,
      codigo: 'SADM6-0096-2024',
      plazo: '(2)\n48 horas',
      fechaLimite: '19-08-2024 09:13:30',
      fechaDerivacion: '19-08-2024 09:13:30',
      detalles: {
        cite: 'GAMEA-67570-2024',
        accion: 'Derivada',
        observacion: 'Para su atención y fines consiguientes.',
        referencia: 'Para su atención y fines consiguientes.',
        proveido: 'La carpeta no llegó en físico, favor verificar.fsdjjjjjjknnnnnnnnnnnnnnnnnnnnnnnnnnndsajjjjjjjjjjjjjj',
        descripcion: 'La carpeta no llegó en físico, favor verificar.fsdjjjjjjknnnnnnnnnnnnnnnnnnnnnnnnnnndsajjjjjjjjjjjjjj',
        
        historial: [
          {
            id: 1,
            remitente: 'SIXTO ULO CHAMBI[SECRETARIA MUNICIPAL DE dsadasdasdasd]',
            fechaDerivacion: '18-08-2024 08:00:00',
            destinatario: 'BETHY LIMACHI VIDAL[SECRETARIA MUNICIPAL DE GESTIÓN INSTITUCIONAL]',
            fechaRecepcion: '18-08-2024 10:00:00',
            proveido: 'Proveído 1',
            observacion: 'Observación 1',
            remision: 'Remisión 1'
          },
          {
            id: 2,
            remitente: 'SIXTO ULO CHAMBI[SECRETARIA MUNICIPAL DE dsadasdasdasd]',
            fechaDerivacion: '18-08-2024 08:00:00',
            destinatario: 'BETHY LIMACHI VIDAL[SECRETARIA MUNICIPAL DE GESTIÓN INSTITUCIONAL]',
            fechaRecepcion: '18-08-2024 10:00:00',
            proveido: 'Proveído 1',
            observacion: 'Observación 1',
            remision: 'Remisión 1'
          },
          {
            id: 3,
            remitente: 'SIXTO ULO CHAMBI[SECRETARIA MUNICIPAL DE dsadasdasdasd]',
            fechaDerivacion: '18-08-2024 08:00:00',
            destinatario: 'BETHY LIMACHI VIDAL[SECRETARIA MUNICIPAL DE GESTIÓN INSTITUCIONAL]',
            fechaRecepcion: '18-08-2024 10:00:00',
            proveido: 'Proveído 1',
            observacion: 'Observación 1',
            remision: 'Remisión 1'
          },
          {
            id: 4,
            remitente: 'SIXTO ULO CHAMBI[SECRETARIA MUNICIPAL DE dsadasdasdasd]',
            fechaDerivacion: '18-08-2024 08:00:00',
            destinatario: 'BETHY LIMACHI VIDAL[SECRETARIA MUNICIPAL DE GESTIÓN INSTITUCIONAL]',
            fechaRecepcion: '18-08-2024 10:00:00',
            proveido: 'Proveído 1',
            observacion: 'Observación 1',
            remision: 'Remisión 1'
          },
          {
            id: 5,
            remitente: 'SIXTO ULO CHAMBI[SECRETARIA MUNICIPAL DE dsadasdasdasd]',
            fechaDerivacion: '18-08-2024 08:00:00',
            destinatario: 'BETHY LIMACHI VIDAL[SECRETARIA MUNICIPAL DE GESTIÓN INSTITUCIONAL]',
            fechaRecepcion: '18-08-2024 10:00:00',
            proveido: 'Proveído 1',
            observacion: 'Observación 1',
            remision: 'Remisión 1'
          },
          ],
          remitente :[
           {id: 1 ,
            r:'Aldo yañez',
            dependencia:'unidad de infrestructura publica',
            cargo: 'jefe de unnidad',
            numero: '78975151',
          }
          ]
          
          
      },
      showDetails: false
    },
    {
      id: 2,
      codigo: 'SADM6-0096-2024',
      plazo: '(2)\n48 horas',
      fechaLimite: '19-08-2024 09:13:30',
      fechaDerivacion: '19-08-2024 09:13:30',
      detalles: {
        cite: 'GAMEA-67570-2024',
        accion: 'Derivada',
        observacion: 'Para su atención y fines consiguientes.',
        referencia: 'Para su atención y fines consiguientes.',
        proveido: 'La carpeta no llegó en físico, favor verificar.fsdjjjjjjknnnnnnnnnnnnnnnnnnnnnnnnnnndsajjjjjjjjjjjjjj',
        descripcion: 'La carpeta no llegó en físico, favor verificar.fsdjjjjjjknnnnnnnnnnnnnnnnnnnnnnnnnnndsajjjjjjjjjjjjjj',
        
        historial: [
          {
            id: 1,
            remitente: 'SIXTO ULO CHAMBI[SECRETARIA MUNICIPAL DE dsadasdasdasd]',
            fechaDerivacion: '18-08-2024 08:00:00',
            destinatario: 'BETHY LIMACHI VIDAL[SECRETARIA MUNICIPAL DE GESTIÓN INSTITUCIONAL]',
            fechaRecepcion: '18-08-2024 10:00:00',
            proveido: 'Proveído 1',
            observacion: 'Observación 1',
            remision: 'Remisión 1'
          },
          {
            id: 2,
            remitente: 'SIXTO ULO CHAMBI[SECRETARIA MUNICIPAL DE dsadasdasdasd]',
            fechaDerivacion: '18-08-2024 08:00:00',
            destinatario: 'BETHY LIMACHI VIDAL[SECRETARIA MUNICIPAL DE GESTIÓN INSTITUCIONAL]',
            fechaRecepcion: '18-08-2024 10:00:00',
            proveido: 'Proveído 1',
            observacion: 'Observación 1',
            remision: 'Remisión 1'
          },
          {
            id: 3,
            remitente: 'SIXTO ULO CHAMBI[SECRETARIA MUNICIPAL DE dsadasdasdasd]',
            fechaDerivacion: '18-08-2024 08:00:00',
            destinatario: 'BETHY LIMACHI VIDAL[SECRETARIA MUNICIPAL DE GESTIÓN INSTITUCIONAL]',
            fechaRecepcion: '18-08-2024 10:00:00',
            proveido: 'Proveído 1',
            observacion: 'Observación 1',
            remision: 'Remisión 1'
          },
          {
            id: 4,
            remitente: 'SIXTO ULO CHAMBI[SECRETARIA MUNICIPAL DE dsadasdasdasd]',
            fechaDerivacion: '18-08-2024 08:00:00',
            destinatario: 'BETHY LIMACHI VIDAL[SECRETARIA MUNICIPAL DE GESTIÓN INSTITUCIONAL]',
            fechaRecepcion: '18-08-2024 10:00:00',
            proveido: 'Proveído 1',
            observacion: 'Observación 1',
            remision: 'Remisión 1'
          },
          {
            id: 5,
            remitente: 'SIXTO ULO CHAMBI[SECRETARIA MUNICIPAL DE dsadasdasdasd]',
            fechaDerivacion: '18-08-2024 08:00:00',
            destinatario: 'BETHY LIMACHI VIDAL[SECRETARIA MUNICIPAL DE GESTIÓN INSTITUCIONAL]',
            fechaRecepcion: '18-08-2024 10:00:00',
            proveido: 'Proveído 1',
            observacion: 'Observación 1',
            remision: 'Remisión 1'
          },  
        ],
        remitente :[
          {id: 1 ,
           r:'Josmel  Trujillo',
           dependencia:'unidad de administracion urbana',
           cargo: 'arquitecto',
           numero: '71115247',
         }
         ],
        
      },
      showDetails: false
    },
   
    // Puedes añadir más elementos aquí si lo necesitas
  ];



  

  ngOnInit(): void {
    // Inicialización si es necesaria
  }

  showDetails = false;

  toggleDetails(correspondence: Correspondence): void {
    correspondence.showDetails = !correspondence.showDetails;
  }

  aceptar(correspondence: Correspondence): void {
    Swal.fire({
      title: '¿Desea continuar?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('¡Aceptado!', 'La acción ha sido confirmada.', 'success');
        console.log('Acción aceptada para:', correspondence);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'La acción ha sido cancelada.', 'info');
      }
    });
  }
  
  rechazar(correspondence: Correspondence): void {
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

  selectedCorrespondence: Correspondence | null = null;
  historialDataSource!: MatTableDataSource<Historial>;
  displayedColumns: string[] = ['id', 'remitente', 'fechaDerivacion', 'destinatario', 'fechaRecepcion', 'proveido', 'observacion', 'remision'];
  ngAfterViewInit() {
    if (this.selectedCorrespondence && this.selectedCorrespondence.detalles.historial) {
      this.historialDataSource = new MatTableDataSource(this.selectedCorrespondence.detalles.historial);
      this.historialDataSource.paginator = this.paginator;
      this.historialDataSource.sort = this.sort;
    }
  }
  constructor() {}
  showHistorial(correspondence: Correspondence): void {
    this.selectedCorrespondence = correspondence;
    if (this.selectedCorrespondence && this.selectedCorrespondence.detalles.historial) {
      this.historialDataSource = new MatTableDataSource(this.selectedCorrespondence.detalles.historial);
      this.historialDataSource.paginator = this.paginator;
      this.historialDataSource.sort = this.sort;
    }
    const modalElement = document.getElementById('historialModal') as HTMLElement;
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  sortData(sort: Sort) {
    const data = this.selectedCorrespondence?.detalles.historial?.slice() || [];
    if (!sort.active || sort.direction === '') {
      this.historialDataSource.data = data;
      return;
    }

    this.historialDataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'remitente': return compare(a.remitente, b.remitente, isAsc);
        case 'fechaDerivacion': return compare(a.fechaDerivacion, b.fechaDerivacion, isAsc);
        case 'destinatario': return compare(a.destinatario, b.destinatario, isAsc);
        case 'fechaRecepcion': return compare(a.fechaRecepcion, b.fechaRecepcion, isAsc);
        case 'proveido': return compare(a.proveido, b.proveido, isAsc);
        case 'observacion': return compare(a.observacion, b.observacion, isAsc);
        case 'remision': return compare(a.remision, b.remision, isAsc);
        default: return 0;
      }
    });
  }
  
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

