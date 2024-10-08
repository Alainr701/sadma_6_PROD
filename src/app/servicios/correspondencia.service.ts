import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseI } from '../interfaces/response';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorrespondenciaService {
   httpA:string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  
  async sendCorrespondencia(body:any) : Promise<ResponseI>{
      return await lastValueFrom(this.http.post <ResponseI>(`${this.httpA}/correspondencias`, body));
  }


}
