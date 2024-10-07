import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

interface Documento {
  referencia: string;
  descripcion: string;
  observacion: string;
  cite: string;
  nombreRemitente: string;
  cargoRemitente: string;
  dependencia: string;
  contacto: string;
  categoria: string;
  tipoDocumento: string;
}


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
 
  formulario: FormGroup;
  documento: Documento;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      referencia: ['', Validators.required],
      descripcion: ['', Validators.required],
      observacion: [''],
      cite: ['', Validators.required],
      categoria: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
    });

    this.documento = {
      referencia: '',
      descripcion: '',
      observacion: '',
      cite: '',
      nombreRemitente: 'HUASCAR ANDREUS VEGA QUIROGA',
      cargoRemitente: 'RECEPCIONISTA',
      dependencia: 'SUB ALCALDÍA DISTRITO MUNICIPAL-6',
      contacto: '70146214',
      categoria: '',
      tipoDocumento: '',
    };
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.formulario.valid) {
      this.documento.referencia = this.formulario.get('referencia')?.value;
      this.documento.descripcion = this.formulario.get('descripcion')?.value;
      this.documento.observacion = this.formulario.get('observacion')?.value;
      this.documento.cite = this.formulario.get('cite')?.value;
      this.documento.categoria = this.formulario.get('categoria')?.value;
      this.documento.tipoDocumento = this.formulario.get('tipoDocumento')?.value;

      console.log('Datos del documento:', this.documento);

      this.mostrarConfirmacion();
    } else {
      this.mostrarError();
    }
  }

  mostrarConfirmacion() {
    Swal.fire({
      title: 'Éxito',
      text: 'Hoja de ruta creada correctamente!',
      icon: 'success',
      confirmButtonText: 'Cerrar',
    });
    this.formulario.reset();
  }

  mostrarError() {
    Swal.fire({
      title: 'Error',
      text: 'Por favor, completa todos los campos requeridos correctamente.',
      icon: 'error',
      confirmButtonText: 'Cerrar',
    });
  }
}
