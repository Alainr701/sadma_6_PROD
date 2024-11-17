import { Component } from '@angular/core';
import { CorrespondenciaService } from '../servicios/correspondencia.service';
import { Correspondences } from '../vistas/mae/correspondencias/correspondencias.component';
import { HistorialApp } from '../vistas/mae/bandeja/entrada-c/entrada-c.component';


export interface HojaRutaa{
  id_hoja_de_ruta: number,
  codigo_interno: string,
  cite: string,
  referencia: string,
  observacion: string,
  descripcion: string,
  tipoDocumento: string,
  categoria: string,
  estado: string,
  fec_cre: string,
  fec_mod: string,
  usu_cre: string,
  usu_mod: string,
  id_personas: number,
  nombres: string,
  apellidos: string,
  roles: string,
  ci: string,
  edad: number,
  celular: number,
  id_roles: number,
  id_cargos: number,
  id_unidad: number,
  id_proveido_personas: number|null,
  nombre: string,
  unidad: string
}

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {


hojaRuta:HojaRutaa|null = null;
  constructor (
    private correspondeceService: CorrespondenciaService
  ) {
   }
   codigoHojaRuta: any;
   anioSeleccionado:any ;   
   anios: any[] = [
     '2021', 
     '2022',
     '2023',
     '2024',
     '2025',
   ];
   currentTime: string = new Date().toLocaleTimeString();
   today: string = new Date().toLocaleDateString();
   search: string|any ='';

  ngOnInit(): void {
    // this.correspondeceService.getCorrespondencia();
  }

  async searchApp(){
    this.search = `SADM6-${this.codigoHojaRuta}-${this.anioSeleccionado}`;
    let body = { 
      'codigo_interno': this.search
    }
    let res = await this.correspondeceService.obtenerUnaCorrespondencia(body);
    this.hojaRuta= res.data[0];
    console.log(res);
  }

  clickButtons(number: number) {
    this.codigoHojaRuta = this.codigoHojaRuta ? Number(this.codigoHojaRuta + '' + number) : number;
  }

  
  listaHistorial: HistorialApp[] = [];
  async  showHistorial(id_hoja_de_ruta: number) {
    
    let body = {
      "id_hoja_de_ruta": id_hoja_de_ruta
    }
    let data = await this.correspondeceService.getHistorial(body);
    this.listaHistorial = data.data;
  }
}
