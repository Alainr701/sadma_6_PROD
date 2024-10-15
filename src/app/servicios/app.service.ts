import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
    public userData: SUserData = {};
}
export interface SUserData {
  id_personas?: any;
  nombres?: any;
  apellidos?: any;
  roles?: any;
  ci?: any;
  edad?: any;
  fec_cre?: any;
  fec_mod?: any;
  usu_cre?: any;
  usu_mod?: any;
  id_roles?: any;
  id_cargos?: any;
  id_unidad?: any;
}

export interface SPersonas {
  id_personas?: any;
  nombres?: any;
  apellidos?: any;
  roles?: any;
  ci?: any;
  edad?: any;
  fec_cre?: any;
  fec_mod?: any;
  usu_cre?: any;
  usu_mod?: any;
  id_roles?: any;
  id_cargos?: any;
  id_unidad?: any;
  nombre?:any;//nombre unidad
}
