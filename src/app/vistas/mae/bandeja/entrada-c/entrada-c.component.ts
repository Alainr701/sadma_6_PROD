import { Component, OnInit } from '@angular/core';

interface Correspondence {
  id: number;
  codigo: string;
  remitente: string;
  plazo: string;
  fechaLimite: string;
  proveido: string;
  detalles: {
    codigo: string;
    accion: string;
    fechaDerivacion: string;
    observacion: string;
  };
  showDetails?: boolean;
}

@Component({
  selector: 'app-entrada-c',
  templateUrl: './entrada-c.component.html',
  styleUrls: ['./entrada-c.component.css'],
  
})
export class EntradaCComponent implements OnInit {
  


  
  correspondences: Correspondence[] = [
    {
      id: 1,
      codigo: 'GAMEA-67570-2024\nORIGINAL',
      remitente: 'Remitente',
      plazo: '(días)\n0 horas',
      fechaLimite: '19-08-2024 09:13:30',
      proveido: 'La carpeta no llegó en físico, favor verificar.',
      detalles: {
      codigo: 'GAMEA-67570-2024',
      accion: 'Derivada',
      fechaDerivacion: '19-08-2024 09:13:30',
      observacion: 'Para su atención y fines consiguientes. Este es un texto largo para probar cómo se ajusta dentro de la columna sin desbordarse.'
      },
      showDetails: false
    },
    {
      id: 2,
      codigo: 'GAMEA-67570-2024\nORIGINAL',
      remitente: 'Remitente',
      plazo: '(días)\n0 horas',
      fechaLimite: '19-08-2024 09:13:30',
      proveido: 'La carpeta no llegó en físico, favor verificar.',
      detalles: {
      codigo: 'GAMEA-67570-2024',
      accion: 'Derivada',
      fechaDerivacion: '19-08-2024 09:13:30',
      observacion: 'Para su atención y fines consiguientes. Este es un texto largo para probar cómo se ajusta dentro de la columna sin desbordarse.'
      },
      showDetails: false
    },
    {
      id: 3,
      codigo: 'GAMEA-67570-2024\nORIGINAL',
      remitente: 'Remitente',
      plazo: '(días)\n0 horas',
      fechaLimite: '19-08-2024 09:13:30',
      proveido: 'La carpeta no llegó en físico, favor verificar.',
      detalles: {
      codigo: 'GAMEA-67570-2024',
      accion: 'Derivada',
      fechaDerivacion: '19-08-2024 09:13:30',
      observacion: 'Para su atención y fines consiguientes. Este es un texto largo para probar cómo se ajusta dentro de la columna sin desbordarse.'
      },
      showDetails: false
    },
    // Puedes añadir más elementos aquí si lo necesitas
  ];

  toggleDetails(correspondence: Correspondence): void {
    correspondence.showDetails = !correspondence.showDetails;
  }

  ngOnInit(): void {
    // Inicialización si es necesaria
  }
}