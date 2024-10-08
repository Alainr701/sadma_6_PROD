import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseI } from 'src/app/interfaces/response';
import { CorrespondenciaService } from 'src/app/servicios/correspondencia.service';
import { FileUtils } from 'src/app/utils/file-utils';
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
  documento: string;
  tipoDocumento?: string;   
}

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
 
  formulario: FormGroup;
  documento: Documento;

  constructor(private fb: FormBuilder,private correspondenciaService: CorrespondenciaService) {
    this.formulario = this.fb.group({
      referencia: ['', Validators.required],
      descripcion: ['', Validators.required],
      observacion: [''],
      cite: ['', Validators.required],
      categoria: ['', Validators.required],
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
      documento: 'CORRESPONDENCIA',
    
    };
  }

  ngOnInit(): void {}

  async onSubmit() {
    console.log('=================================');
    console.log(JSON.stringify(this.formulario.value, null, 2));
    console.log(`${this.formulario}`);
    console.log('=================================');
    // debugger
    if (this.formulario.valid) {
      this.documento.referencia = this.formulario.get('referencia')?.value;
      this.documento.descripcion = this.formulario.get('descripcion')?.value;
      this.documento.observacion = this.formulario.get('observacion')?.value;
      this.documento.cite = this.formulario.get('cite')?.value;
      this.documento.categoria = this.formulario.get('categoria')?.value;
      console.log('Datos del documento:', this.documento);
      let  res :ResponseI = await this.correspondenciaService.sendCorrespondencia(this.documento);
      debugger
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
  subirArchivo(event: any) {
    const archivo = event.target.files[0];
    FileUtils.convertFileToBase64(archivo).then(base64 => this.documento.documento = base64 as string);
  }
}
