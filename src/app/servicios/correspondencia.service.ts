import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseI } from '../interfaces/response';
import { async, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorrespondenciaService {

  derivarCorrespondence:any;


   httpA:string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  
  async sendCorrespondencia(body:any ) : Promise<ResponseI>{
      return await lastValueFrom(this.http.post <ResponseI>(`${this.httpA}/correspondencias_guardar`, body));
  }


  async crearDocumento(body:any) : Promise<ResponseI>{
    return await lastValueFrom(this.http.post <ResponseI>(`${this.httpA}/correspondencias_sabeDoc`, body));
  }
  async obtenerCorrespondencia(body:any) : Promise<ResponseI>{
    return lastValueFrom(this.http.post<ResponseI>(`${this.httpA}/obtenerCorrespondencia` ,body));
  }

  async  obtenerPersonasUnidad() : Promise<ResponseI>{
    return lastValueFrom(this.http.get<ResponseI>(`${this.httpA}/obtenerPersonasUnidad` ));
  }
  //derivaciones 
  async crearDerivacion(body:any){
    return lastValueFrom(this.http.post<ResponseI>(`${this.httpA}/crearDerivacion`,body));
  }
  async editarDerivacion(body:any){
    return lastValueFrom(this.http.post<ResponseI>(`${this.httpA}/editarDerivacion`,body));
  }
  async  aceptarDerivacion(body:any) : Promise<ResponseI>{
    return lastValueFrom(this.http.post<ResponseI>(`${this.httpA}/aceptarDerivacion`, body));
  }
  async  rechazarDerivacion(body:any) : Promise<ResponseI>{
    return lastValueFrom(this.http.post<ResponseI>(`${this.httpA}/rechazarDerivacion`, body));
  }
  async  concluidoGamea(body:any) : Promise<ResponseI>{
    return lastValueFrom(this.http.post<ResponseI>(`${this.httpA}/concluidoGamea`, body));
  }
  //http://localhost:3000/obtenerDoc
  async  obtenerDoc(body:any) : Promise<ResponseI>{
    return lastValueFrom(this.http.post<ResponseI>(`${this.httpA}/obtenerDoc`, body));
  }
  async  guardarDerivacionHojaDeRuta(body:any) : Promise<ResponseI>{
    return lastValueFrom(this.http.post<ResponseI>(`${this.httpA}/guardarDerivacionHojaDeRuta`, body));
  }
  async  getHistorial(body:any) : Promise<ResponseI>{
    return lastValueFrom(this.http.post<ResponseI>(`${this.httpA}/getHistorial`, body));
  }
  async buscarPersona(body:any) : Promise<ResponseI>{
    return lastValueFrom(this.http.post<ResponseI>(`${this.httpA}/buscarPersona`, body));
  }
  async obtenerTotales(body:any) : Promise<ResponseI>{
    return lastValueFrom(this.http.post<ResponseI>(`${this.httpA}/obtenerHistorialDeDerivaciones`, body));
  }
  async obtenerHistorialData(body:any) : Promise<ResponseI>{
    return lastValueFrom(this.http.post<ResponseI>(`${this.httpA}/obtenerHistorialData`, body));
  }
  async obtenerUnaCorrespondencia(body:any) : Promise<ResponseI>{
    return lastValueFrom(this.http.post<ResponseI>(`${this.httpA}/obtenerUnaCorrespondencia`, body));
  }  
  async obternerCodigoInterno(body:any) : Promise<ResponseI>{
    return lastValueFrom(this.http.post<ResponseI>(`${this.httpA}/obternerCodigoInterno`, body));
  }
async obtenerRoles(): Promise<ResponseI> {
  return lastValueFrom(this.http.get<ResponseI>(`${this.httpA}/obtenerRoles`));
}

async obtenerCargos(): Promise<ResponseI> {
  return lastValueFrom(this.http.get<ResponseI>(`${this.httpA}/obtenerCargos`));
}

async obtenerUnidades(): Promise<ResponseI> {
  return lastValueFrom(this.http.get<ResponseI>(`${this.httpA}/obtenerUnidades`));
}
async agregarPersona(body:any): Promise<ResponseI> {
  return lastValueFrom(this.http.post<ResponseI>(`${this.httpA}/agregarPersonas`, body));
}
async agregarUsuarios(body:any): Promise<ResponseI> {
  return lastValueFrom(this.http.post<ResponseI>(`${this.httpA}/agregarUsuarios`, body));
}  
async consultarPersonas(): Promise<ResponseI> {
  return lastValueFrom(this.http.get<ResponseI>(`${this.httpA}/consultarPersonas`));
}

}
