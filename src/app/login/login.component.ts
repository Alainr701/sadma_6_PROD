import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { LoginService } from '../servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    
    private loginService: LoginService, private router: Router) { 

  }
  email: string = '';
  password: string = '';


  login() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    this.loginService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Login exitoso:', response);
      },
      (error) => {
        console.error('Error en el login:', error);
      }
    )
    this.router.navigate(['mae/inicio']); 
  }
}
