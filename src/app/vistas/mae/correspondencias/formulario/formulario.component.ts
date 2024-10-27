import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseI } from 'src/app/interfaces/response';
import { AppService } from 'src/app/servicios/app.service';
import { CorrespondenciaService } from 'src/app/servicios/correspondencia.service';
import { FileUtils } from 'src/app/utils/file-utils';
import Swal from 'sweetalert2';

export interface Documento {
    referencia: any;
    descripcion: any;
    observacion: any;
    cite: any;
    tipo: any;
    categoria: any;
    documento: any;
    usu_cre: any;
    estado: any;
    id_documentos: any;
    id_personas: any;
  
}

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  @Input() doc: Documento|null = null;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
 
  formulario: FormGroup;

  ngOnInit(): void {
    if (this.doc != null) {
      
      this.documento = this.doc;
    }
  }
  documento: Documento = {
    referencia: null,
    descripcion: null,
    observacion: null,
    cite: null,
    tipo: null,
    categoria: null,
    documento: null,
    usu_cre: null,
    estado: null,
    id_documentos: null,
    id_personas: null,
  };
  tipoDocumento: any;

  constructor(private fb: FormBuilder,private correspondenciaService: CorrespondenciaService, private appService: AppService,private router: Router) {
    this.formulario = this.fb.group({
      referencia: ['', Validators.required],
      descripcion: ['', Validators.required],
      observacion: [''],
      cite: ['', Validators.required],
      categoria: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
    });

    // this.documento = {
    //   referencia: '',
    //   descripcion: '',
    //   observacion: '',
    //   cite: '',
    //   nombreRemitente: 'HUASCAR ANDREUS VEGA QUIROGA',
    //   cargoRemitente: 'RECEPCIONISTA',
    //   dependencia: 'SUB ALCALDÍA DISTRITO MUNICIPAL-6',
    //   contacto: '70146214',
    //   categoria: '',
    //   documento: 'CORRESPONDENCIA',
    
    // };
  }



  async onSubmit() {
    try {
      
    console.log('=================================');
    console.log(JSON.stringify(this.formulario.value, null, 2));
    console.log(`${this.formulario}`);
    console.log('=================================');
    //  
    if (this.formulario.valid) {
       
      let da =  this.appService.userData.id_personas;
      this.documento.id_personas =this.appService.userData.id_personas;
      this.documento.referencia = this.formulario.get('referencia')?.value;
      this.documento.descripcion = this.formulario.get('descripcion')?.value;
      this.documento.observacion = this.formulario.get('observacion')?.value;
      this.documento.cite = this.formulario.get('cite')?.value;
      this.documento.categoria = this.formulario.get('categoria')?.value;
      this.documento.tipo =this.formulario.get('tipoDocumento')?.value;
      this.documento.estado ="CREADO";
      //TODO CHANGE
      this.documento.usu_cre=this.appService.userData.apellidos;
      console.log('=================================');
      console.log(JSON.stringify(this.documento, null, 2));
      console.log('=================================');
      let  res :ResponseI = await this.correspondenciaService.sendCorrespondencia(this.documento);
      console.log('=================================');
      console.log(JSON.stringify(res, null, 2));
      console.log('=================================');
      if (!res.status) {
        this.mostrarErrorMensaje('No se pudo crear la hoja de ruta');
        return;
      }
      let body = {
        "id_hoja_de_ruta": res.data,
        "doc64": this.documento.documento,
        "tipo_documento": "pdf"
      }

      let res2: ResponseI = await this.correspondenciaService.
      crearDocumento(body);
      if (!res2.status) { 
        this.mostrarErrorMensaje('No se pudo guardar el documento');
        return;
      }
      let res3: ResponseI = await this.correspondenciaService.
      guardarDerivacionHojaDeRuta({ // esto guarda en el historial de derivaciones
        "id_personas": this.appService.userData.id_personas,
        "id_hoja_de_ruta": res.data,
        "observacion": '',
        "plazo_dias": null,
        "proveido": '',
        "estado": 'CREADO',
        "id_proveido_personas": this.appService.userData.id_personas,
        "usu_mod": "alain.espino",
        "id_documento_save":  res2.data

      })
      if (!res3.status) {
       Swal.fire('Error', 'No se pudo crear la derivación', 'error');
        return;
      }
      this.mostrarConfirmacion();
      this.onClose();
    } else {
      this.mostrarError();
    }
  } catch (error) {
    console.log('=================================');
    console.log(JSON.stringify(error, null, 2));
    console.log(`${error}`);
    console.log('=================================');
      
  }
  }
  

  mostrarConfirmacion() {
    Swal.fire({
      title: 'Éxito',
      text: 'Hoja de ruta creada correctamente!',
      icon: 'success',
      confirmButtonText: 'Cerrar',
    });
    // this.formulario.reset();
  }

  mostrarError() {
    Swal.fire({
      title: 'Error',
      text: 'Por favor, completa todos los campos requeridos correctamente.',
      icon: 'error',
      confirmButtonText: 'Cerrar',
    });
  }
  mostrarErrorMensaje(msg: string) {
    Swal.fire({
      title: 'Error',
      text: msg,
      icon: 'error',
      confirmButtonText: 'Cerrar',
    });
  }
  subirArchivo(event: any) {
    const archivo = event.target.files[0];
    FileUtils.convertFileToBase64(archivo).then(base64 => this.documento.documento = base64 as string);
  }
}
