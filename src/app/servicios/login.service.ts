import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(usuario: string, password: string): Observable<any> {
    const body = {
      usuario,
      password
    };
    return this.http.post<any>('http://localhost:3000/login', body);
  }
  
}
