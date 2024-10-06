import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

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

interface C_aceptada {
  id: number;
  codigo: string;
  referencia: string;
  fechaAceptacion: string;
  detalles: {
    proveido: string;
    accion: string;
    descripcion: string;
    observacion: string;
    cite: string;
    archivo: string;
    historial?: Historial[];
  };
  showDetails?: boolean;
}
interface C_remitida {
  id: number;
  codigo: string;
  referencia: string;
  fechaRemision: string;
  motivo:string;
  detalles: {
    proveido: string;
    accion: string;
    descripcion: string;
    observacion: string;
    cite: string;
    archivo: string;
    historial?: Historial[];
  };
  showDetails?: boolean;
}

@Component({
  selector: 'app-detalle1',
  templateUrl: './detalle1.component.html',
  styleUrls: ['./detalle1.component.css'],
})
export class Detalle1Component implements OnInit {
  id!: number;
  mensaje!: string; // Variable para almacenar el mensaje según el ID

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.id = +idParam;
        console.log('ID recibido:', this.id);
      } else {
        console.error('No se recibió un ID válido');
      }
    });
  }

  volver() {
    this.router.navigate(['/mae/bandeja-principal']); // Redirige a la bandeja principal sin parámetros
  }

  // corespondencia aceptada
  correspondences: C_aceptada[] = [
    {
      id: 1,
      codigo: 'GAMEA-67570-2024',
      referencia: 'ORIGINAL',
      fechaAceptacion: '19-08-2024 09:13:30',
      detalles: {
        proveido: 'La carpeta no llegó en físico, favor verificar.',
        accion: 'Derivada',
        descripcion: 'fsdjjjjjjknnnnnnnnnnnnnnnnnnnnnnnnnnndsajjjjjjjjjjjjjj', // Descripción adicional
        observacion: 'Para su atención y fines consiguientes.',
        cite: 'GAMEA-67570-2024', // Código o cita del documento
        archivo: 'GAMEA-67570-2024.pdf',
        historial: [
          {
            id: 1,
            remitente:
              'SIXTO ULO CHAMBI[SECRETARIA MUNICIPAL DE GESTIÓN INSTITUCIONAL]',
            fechaDerivacion: '18-08-2024 08:00:00',
            destinatario:
              'BETHY LIMACHI VIDAL[SECRETARIA MUNICIPAL DE GESTIÓN INSTITUCIONAL]',
            fechaRecepcion: '18-08-2024 10:00:00',
            proveido: 'Proveído 1',
            observacion: 'Observación 1',
            remision: 'Remisión 1',
          },
          {
            id: 2,
            remitente:
              'SIXTO ULO CHAMBI[SECRETARIA MUNICIPAL DE GESTIÓN INSTITUCIONAL]',
            fechaDerivacion: '19-08-2024 09:13:30',
            destinatario: 'Destinatario 2',
            fechaRecepcion: '19-08-2024 10:30:00',
            proveido: 'Proveído 2',
            observacion: 'Observación 2',
            remision: 'Remisión 2',
          },
        ],
      },
      showDetails: false,
    },
    {
      id: 1,
      codigo: 'GAMEA-67570-2024',
      referencia: 'ORIGINAL',
      fechaAceptacion: '19-08-2024 09:13:30',
      detalles: {
        proveido: 'La carpeta no llegó en físico, favor verificar.',
        accion: 'Derivada',
        descripcion: 'fsdjjjjjjknnnnnnnnnnnnnnnnnnnnnnnnnnndsajjjjjjjjjjjjjj', // Descripción adicional
        observacion: 'Para su atención y fines consiguientes.',
        cite: 'GAMEA-67570-2024', // Código o cita del documento
        archivo: 'GAMEA-67570-2024.pdf',
        historial: [
          {
            id: 1,
            remitente:
              'SIXTO ULO CHAMBI[SECRETARIA MUNICIPAL DE GESTIÓN INSTITUCIONAL]',
            fechaDerivacion: '18-08-2024 08:00:00',
            destinatario:
              'BETHY LIMACHI VIDAL[SECRETARIA MUNICIPAL DE GESTIÓN INSTITUCIONAL]',
            fechaRecepcion: '18-08-2024 10:00:00',
            proveido: 'Proveído 1',
            observacion: 'Observación 1',
            remision: 'Remisión 1',
          },
          {
            id: 2,
            remitente:
              'SIXTO ULO CHAMBI[SECRETARIA MUNICIPAL DE GESTIÓN INSTITUCIONAL]',
            fechaDerivacion: '19-08-2024 09:13:30',
            destinatario: 'Destinatario 2',
            fechaRecepcion: '19-08-2024 10:30:00',
            proveido: 'Proveído 2',
            observacion: 'Observación 2',
            remision: 'Remisión 2',
          },
        ],
      },
      showDetails: false,
    },
    // Otros objetos Correspondence...
  ];

  selectedCorrespondence: C_aceptada | null = null;

  toggleDetails(correspondence: C_aceptada): void {
    correspondence.showDetails = !correspondence.showDetails;
  }
  remitente(correspondence: C_aceptada): void {
    Swal.fire({
      title: 'Información del Usuario',
      html: `
        <div style="text-align: center; margin-bottom: 15px;">
        <img src="https://unsplash.it/100/100" style="border-radius: 50%;" alt="Imagen del usuario" />
      </div>
      <div style="text-align: center; margin-bottom: 15px;">
        <h5 style="margin: 0; color: #28a745;">HUASCAR ANDREUS VEGA QUIROGA</h5>
        <hr />
        <p><strong>DEPENDENCIA:</strong> SUB ALCALDIA DISTRITO MUNICIPAL-6</p>
        <p><strong>CARGO:</strong> RECEPCIONISTA</p>
        <p><strong>NUMERO CEL:</strong> 78956325</p>
        <hr />
      </div>
      `,
      confirmButtonText: 'Cerrar',
      customClass: {
        container: 'custom-swal-container',
        title: 'custom-swal-title',
        htmlContainer: 'custom-swal-body',
        confirmButton: 'custom-swal-confirm-button',
      },
    });
  }
  remisor(correspondence: C_aceptada): void {
    Swal.fire({
      title: 'Información del Usuario',
      html: `
        <div style="text-align: center; margin-bottom: 15px;">
        <img src="https://unsplash.it/100/100" style="border-radius: 50%;" alt="Imagen del usuario" />
      </div>
      <div style="text-align: center; margin-bottom: 15px;">
        <h5 style="margin: 0; color: #28a745;">HUASCAR ANDREUS VEGA QUIROGA</h5>
        <hr />
        <p><strong>DEPENDENCIA:</strong> SUB ALCALDIA DISTRITO MUNICIPAL-6</p>
        <p><strong>CARGO:</strong> RECEPCIONISTA</p>
        <p><strong>NUMERO CEL:</strong> 78956325</p>
        <hr />
      </div>
      `,
      confirmButtonText: 'Cerrar',
      customClass: {
        container: 'custom-swal-container',
        title: 'custom-swal-title',
        htmlContainer: 'custom-swal-body',
        confirmButton: 'custom-swal-confirm-button',
      },
    });
  }
  showHistorial(correspondence: C_aceptada): void {
    this.selectedCorrespondence = correspondence;
    const modalElement = document.getElementById(
      'historialModal'
    ) as HTMLElement;
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  
 
}
