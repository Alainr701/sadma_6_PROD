import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResponseI } from 'src/app/interfaces/response';
import { CorrespondenciaService } from 'src/app/servicios/correspondencia.service';
import Swal from 'sweetalert2';
declare global {
  interface Window {
    bootstrap: any;
  }
}
interface PersonaUsuarios{
  estado: boolean;
  usuario: string;
  id_personas: number;
  nombres: string;
  apellidos: string;
  roles: string;
  ci: string;
  edad: number;
  celular: number;
  fec_cre: Date | null;
  fec_mod: Date | null;
  usu_cre: string | null;
  usu_mod: string | null;
  id_roles: number;
  id_cargos: number;
  id_unidad: number;
}


interface Inf {
  id: number;
  nombre: string;
}
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  listaRoles: Inf[] = [];
  listaCargos: Inf[] = [];
  listaUnidades: Inf[] = [];
  listaPersonas: PersonaUsuarios[] = [];

  nombre: string = '';
  apellido: string = '';
  profesion: string = '';
  ci: string = '';
  expedido: string = '';
  contacto: number = 0;
  edad: number = 0;
  usuario: string = '';
  contrasena: string = '';
  rolSelected: number = 0;
  unidadSelected: number = 0;
  cargoSelected: number = 0;
  async guardarTecnico() {
    let body =
    {
      nombres: this.nombre,
      apellidos: this.apellido,
      roles: "",
      ci: this.ci,
      edad: this.edad,
      celular: this.contacto,
      usu_cre: "kjasd",
      usu_mod: "",
      id_roles: 1,
      id_cargos: 1,
      id_unidad: 1
    };

    let res: ResponseI = await this.serviceCorrespondencia.agregarPersona(body);
    if (!res.data) {
      Swal.fire('Error', res.message, 'error');
      return;
    }
    
    let resUsuario: ResponseI 
    = await  this.serviceCorrespondencia.agregarUsuarios(
      {
        usuario: this.usuario,
        password: this.contrasena,
        id_personas: res.data
      }
    );
    if (!resUsuario.status) {
      Swal.fire('Error', resUsuario.message, 'error');
    }
    await Swal.fire({
      title: 'Completado',
      text: 'El técnico ha sido guardado exitosamente.',
      icon: 'success',
      confirmButtonText: 'Cerrar',timer: 3000
    });
    this.closeModal();
    await this.gePersonas();
  };
  
  async actualizarTecnico(){
    let body = {
      id_personas: this.usuarios?.id_personas,
      nombres: this.nombre,
      apellidos: this.apellido,
      ci: this.ci,
      edad: this.edad,
      celular: this.contacto,
      usu_mod: "",
      id_roles: this.rolSelected ,
      id_cargos: 0 ,
      id_unidad: this.unidadSelected
    };
    

    let res: ResponseI = await this.serviceCorrespondencia.actualizarPersona(body);
    if (!res.status) {
      Swal.fire('Error', res.message, 'error');
      return;
    }
    
    let resUsuario: ResponseI 
    = await  this.serviceCorrespondencia.actualizarUsuarios(
      {
        usuario: this.usuario,
        password: this.contrasena,
        id_personas: res.data
      }
    );
    if (!resUsuario.status) {
      Swal.fire('Error', resUsuario.message, 'error');
    }
    await Swal.fire({
      title: 'Completado',
      text: 'El técnico ha sido actualizado exitosamente.',
      icon: 'success',
      confirmButtonText: 'Cerrar',timer: 3000
    });
    this.closeModal();
    await this.gePersonas();
  };
  
async  gePersonas (){
    let resP: ResponseI = await this.serviceCorrespondencia.consultarPersonas();
    this.listaPersonas  = resP.data;
  }
  

  async ngOnInit(){
  let resR: ResponseI = await this.serviceCorrespondencia.obtenerRoles();
  let resC: ResponseI = await this.serviceCorrespondencia.obtenerCargos();
  let resU: ResponseI = await this.serviceCorrespondencia.obtenerUnidades();

  this.listaCargos = resC.data;
  this.listaRoles = resR.data;
  this.listaUnidades = resU.data;
  await this.gePersonas();
 
}
constructor(private serviceCorrespondencia: CorrespondenciaService) {

}

usuarios: PersonaUsuarios|null = null;
modificarUsuario(usuario:PersonaUsuarios) {
  this.openModal();
  this.nombre =usuario.nombres;
  this.apellido =usuario.apellidos;
  this.profesion =usuario.roles;
  this.ci =usuario.ci;
  this.expedido ="";
  this.contacto =usuario.celular;
  this.edad =usuario.edad;
  this.usuario =usuario.usuario;
  this.rolSelected =usuario.id_roles - 1;
  this.unidadSelected =usuario.id_unidad - 1;
  this.cargoSelected =usuario.id_cargos  - 1;
  this.usuarios = usuario;
}



// Función para cambiar el estado del usuario
async toggleEstado(user: PersonaUsuarios) {
  this.listaPersonas.find((u) => u.id_personas === user.id_personas)!.estado = !user.estado!;
  let body= {
    "id_personas": user.id_personas,
    "estado": user.estado
  }
  let res = await this.serviceCorrespondencia.actualizarEstadoUsuario(body);
  if (!res.status) {
    Swal.fire('Error', res.message, 'error');
  }
  Swal.fire({
    title: 'Completado',
    text: 'El estado del usuario ha sido actualizado.',
    icon: 'success',
    confirmButtonText: 'Cerrar',
    timer: 3000
  });
  
  await this.gePersonas();
  
  
}

openModal() {
  this.nombre ='';
  this.apellido ='';
  this.profesion ='';
  this.ci ='';
  this.expedido ='';
  this.contacto = 0;
  this.edad = 0;
  this.usuario ='';
  this.rolSelected =0;
  this.unidadSelected =0;
  this.cargoSelected =0;
  const modal = new window.bootstrap.Modal(
    document.getElementById('modalAgregarTecnico')!
  );
  modal.show();
}

closeModal() {
  this.usuarios = null;
  const modal = new window.bootstrap.Modal(
    document.getElementById('ModalClose')!
  );
  modal.hide();
}
//  hideModal() {
//   bootstrap.Modal.getInstance(document.getElementById('exampleModal')).hide();
// }
//  showModal() {
//   bootstrap.Modal.getOrCreateInstance(document.getElementById('exampleModal')).show();
// }
    
}
