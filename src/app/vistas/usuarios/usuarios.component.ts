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
  estado: number;
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
  contacto: string = '';
  edad: number = 0;
  usuario: string = '';
  contrasena: string = '';
  rol: number = 0;
  unidad: number = 0;
  cargo: number = 0;
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

modificarUsuario(usuario:PersonaUsuarios) {
  this.openModal();
  this.nombre =usuario.nombres;
  this.apellido =usuario.apellidos;
  this.profesion =usuario.roles;
  this.ci =usuario.ci;
  this.expedido ="";
  this.contacto ="";
  this.edad =usuario.edad;
  this.usuario =usuario.usuario;
  this.rol =usuario.id_roles;
  this.unidad =usuario.id_unidad;
  this.cargo =usuario.id_cargos ;
}




// Función para cambiar el estado del usuario
toggleEstado(user: PersonaUsuarios) {
  user.estado = user.estado!;
}

openModal() {
  const modal = new window.bootstrap.Modal(
    document.getElementById('modalAgregarTecnico')!
  );
  modal.show();
}

closeModal() {
  const modal = new window.bootstrap.Modal(
    document.getElementById('modalAgregarTecnico')!
  );
  modal.hide();
}
    
}
