import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

declare var bootstrap: any; 
import {MatTableDataSource} from '@angular/material/table';

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
  
  
  detalles: {
    cite: string;
    tipo_documento: string;
    observacion: string;
    referencia: string;
    categoria: string;
    descripcion: string;
    remitente?: Remitente[];
  };
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
  openModal() {
    // Obtener la instancia del modal y mostrarlo
    const modal = new bootstrap.Modal(document.getElementById('nuevaCorrespondenciaModal')!);
    modal.show();
  }
  correspondences: Correspondence[] = [
    {
      id: 1,
      codigo: 'SADM6-0096-2024',
      
      detalles: {
        cite: 'GAMEA-67570-2024',
        tipo_documento: 'linea nivel',
        observacion: 'Para su atención y fines consiguientes.',
        referencia: 'Para su atención y fines consiguientes.',
        categoria: 'Urgente.',
        descripcion: 'La carpeta no llegó en físico, favor verificar.',
        
        remitente: [
          {
            id: 1,
            r: 'Aldo Yañez',
            dependencia: 'Unidad de Infraestructura Pública',
            cargo: 'Jefe de Unidad',
            numero: '78975151',
          }
        ]
      },
      showDetails: false,
      isCollapsed: true
    },
    // Puedes añadir más elementos aquí si lo necesitas
  ];

  ngOnInit(): void {
    // Inicialización si es necesaria
  }

  toggleDetails(correspondence: Correspondence): void {
    correspondence.showDetails = !correspondence.showDetails;
  }

  toggleCollapse(correspondence: Correspondence): void {
    correspondence.isCollapsed = !correspondence.isCollapsed;
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

  constructor() {}
}

