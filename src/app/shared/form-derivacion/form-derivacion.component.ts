import { Component, Input } from '@angular/core';
import { async } from 'rxjs';
import { AppService, SPersonas, SUserData } from 'src/app/servicios/app.service';
import { CorrespondenciaService } from 'src/app/servicios/correspondencia.service';
import Swal from 'sweetalert2';

interface DerivationData {
  dependency: string;
  reception: string;
  provider: string;
  observation: string;
  days: number;
}


@Component({
  selector: 'app-form-derivacion',
  templateUrl: './form-derivacion.component.html',
  styleUrls: ['./form-derivacion.component.css']
})
export class FormDerivacionComponent {
  @Input() cerrarModal?: () => void;
  @Input() params: any; 

  
  step: number = 1;
  isModalVisible: boolean = false; // Inicialmente invisible
  formData: DerivationData = {
    dependency: '',
    reception: '',
    provider: '',
    observation: '',
    days: 1
  };
  listaPersonas:SPersonas[]=[];
  selectedPersona: SPersonas | any = null;
  constructor(
    private correspondenciaService: CorrespondenciaService,
    private appService: AppService
  ) { }
  async ngOnInit() { 

  }

  async  ngAfterViewInit(){

    console.log('=================================');
    console.log(JSON.stringify(this.correspondenciaService.derivarCorrespondence, null, 2));
    console.log('=================================');    
  } 

  cerarModalHTML() {
    this.isModalVisible = false;
  }


  async openModal() {
    console.log('Método openModal llamado en FormDerivacionComponent');
    const res= await this.correspondenciaService.obtenerPersonasUnidad(); 
    this.listaPersonas = res.data;
    this.isModalVisible = true;
  }

  closeModal(): void {
    if (this.cerrarModal) {
      this.cerrarModal();
    }
  }


  handleNext(): void {
    if (this.step < 3) this.step++;
  }

  handleBack(): void {
    if (this.step > 1) this.step--;
  }

  showBackButton(): boolean {
    return this.step > 1;
  }
  onDependencyChange(): void {
    this.selectedPersona = this.listaPersonas.find(
      persona => persona.id_personas === parseInt(this.formData.dependency)
    );



    if (this.selectedPersona) {
      this.formData.reception = this.selectedPersona.id_personas;
    }
  }

  async submitForm(){
    Swal.fire({
      title: '¿Desea continuar?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then(async (result) => {
      
      if (result.isConfirmed) {
        // Aquí iría la lógica para procesar la derivación
        console.log('Procesando derivación:', this.formData);
        let body= 
          {
            "id_personas": this.selectedPersona.id_personas,
            "id_hoja_de_ruta": this.correspondenciaService.derivarCorrespondence.id_hoja_de_ruta,
            "observacion": this.formData.observation,
            "plazo_dias": this.formData.days,
            "proveido": this.formData.provider,
            "estado": 'DERIVADO',
            "id_proveido_personas": this.appService.userData.id_personas
          };
        let res =  await this.correspondenciaService.crearDerivacion(body); 
        if (!res.status){
          Swal.fire('Hubo un error!', ' La hoja de ruta no ha sido derivada.', 'error').then(() => {
            this.closeModal(); // Cerrar el modal después de la confirmación
          });
          return
        }
        Swal.fire('¡Aceptado!', 'La hoja de ruta ha sido derivada exitosamente.', 'success').then(() => {
          this.closeModal(); // Cerrar el modal después de la confirmación
        });
      }
    });
      // Función que se ejecuta al cambiar la dependencia seleccionada
 
  }
  

  private resetForm(): void {
    this.step = 1;
    this.formData = {
      dependency: '',
      reception: '',
      provider: '',
      observation: '',
      days: 1
    };
  }
}
