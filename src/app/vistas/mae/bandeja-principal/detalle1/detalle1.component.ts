import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CorrespondenciaService } from 'src/app/servicios/correspondencia.service';
import Swal from 'sweetalert2';
import { Correspondences } from '../../correspondencias/correspondencias.component';
import { SPersonas } from 'src/app/servicios/app.service';

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
interface SHistorial {
  codigo_interno: string; // e.g., "SADM6-80-2024"
  referencia: string; // e.g., "example"
  fecha_respuesta: string; // e.g., "0000-00-00 00:00:00"
  id_historial_derivaciones: number; // e.g., 16
  proveido: string; // e.g., "Ej: Para su Atencion"
  estado: string; // e.g., "DERIVADO"
  obs: string; // e.g., "YUIUY"
  cite: string; // e.g., "example"
  id_documento_save: number; // e.g., 0
  id_personas: number; // e.g., 0
  id_proveido_personas:number,
  descripcion: string;
  showDetails?: boolean;
}

@Component({
  selector: 'app-detalle1',
  templateUrl: './detalle1.component.html',
  styleUrls: ['./detalle1.component.css'],
})
export class Detalle1Component implements OnInit {
  data: any;
  mensaje!: string; // Variable para almacenar el mensaje según el ID

  listaHistarial: SHistorial[] = [];
  constructor(private route: ActivatedRoute, private router: Router, private serviceCorrespondencia: CorrespondenciaService) {}

  async ngOnInit() {
    this.data = history.state
    let body= {
      "id_personas": this.data.id_personas,
      "estado": this.data.estado
    }
    let res = await this.serviceCorrespondencia.obtenerHistorialData(body);
    this.listaHistarial = res.data;
  }
  volver() {
    this.router.navigate(['/mae/bandeja-principal']); // Redirige a la bandeja principal sin parámetros
  }
  // corespondencia aceptada
 

  // selectedCorrespondence: C_aceptada | null = null;
  selectedPersona: SPersonas | null= null;

  toggleDetails(correspondence: SHistorial): void {
    correspondence.showDetails = !correspondence.showDetails;
  }

  async getRemitente(id:number){
    let body = {
      id_personas: id,
    }
    let res = await this.serviceCorrespondencia.buscarPersona(body);
    this.selectedPersona = res.data[0];
  }

  async remitente(id: any) {
    
     await this.getRemitente(id)

    
        Swal.fire({
      title: 'Información del Usuario',
      html: `
        <div style="text-align: center; margin-bottom: 15px;">
        <img src="https://unsplash.it/100/100" style="border-radius: 50%;" alt="Imagen del usuario" />
      </div>
      <div style="text-align: center; margin-bottom: 15px;">
        <h5 style="margin: 0; color: #28a745;">${this.selectedPersona?.nombres} ${this.selectedPersona?.apellidos}</h5>
        <hr />
        <p><strong>DEPENDENCIA:</strong> ${this.selectedPersona?.nombre}</p>
        <p><strong>CARGO:</strong>${this.selectedPersona?.cargo} </p>
        <p><strong>NUMERO CEL:</strong>${this.selectedPersona?.celular}</p>
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
  async remisor(id: any) {
    await this.getRemitente(id);
    Swal.fire({
      title: 'Información del Usuario',
      html: `
       <div style="text-align: center; margin-bottom: 15px;">
        <img src="https://unsplash.it/100/100" style="border-radius: 50%;" alt="Imagen del usuario" />
      </div>
      <div style="text-align: center; margin-bottom: 15px;">
        <h5 style="margin: 0; color: #28a745;">${this.selectedPersona?.nombres} ${this.selectedPersona?.apellidos}</h5>
        <hr />
        <p><strong>DEPENDENCIA:</strong> ${this.selectedPersona?.nombre}</p>
        <p><strong>CARGO:</strong>${this.selectedPersona?.cargo} </p>
        <p><strong>NUMERO CEL:</strong>${this.selectedPersona?.celular}</p>
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
  showHistorial(correspondence: any): void {
    this.selectedPersona = correspondence;
    const modalElement = document.getElementById(
      'historialModal'
    ) as HTMLElement;
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  
 
}
