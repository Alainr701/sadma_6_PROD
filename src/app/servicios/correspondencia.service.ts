import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseI } from '../interfaces/response';
import { lastValueFrom } from 'rxjs';

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
  //http://localhost:3000/obtenerDoc
  async  obtenerDoc(body:any) : Promise<ResponseI>{
    return lastValueFrom(this.http.post<ResponseI>(`${this.httpA}/obtenerDoc`, body));
  }
  
}
