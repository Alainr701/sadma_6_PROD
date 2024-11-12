import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { LoginService } from '../servicios/login.service';
import { AppService, SUserData } from '../servicios/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    
    private loginService: LoginService,
    private appService: AppService,
    private router: Router,
  ) { 

  }
  email: string = '';
  password: string = '';

  ngOnInit(): void {
    // sessionStorage.clear();
    
    if (sessionStorage.getItem('userData')) {
      this.router.navigate(['mae']);
    }
  }


  login() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    this.loginService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Login exitoso:', response);
        if (response.status) {
          Swal.fire({
            title: 'Login exitoso!',
            text: 'Espere un momento...',
            timer: 1500,
            showConfirmButton: false,
            icon: 'success'
          });
           
          sessionStorage.setItem('userData', JSON.stringify(response.data));
          this.appService.userData = JSON.parse(sessionStorage.getItem('userData')!) as SUserData;
          console.log('User data:', this.appService.userData);
          

        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.message
          });
          console.error('Error en el login:', response.message);
        }
        this.router.navigate(['mae']);
      },
      (error) => {
        console.error('Error en el login:', error);
        Swal.fire({
          icon: 'error',
          title: '',
          text: 'No existe el usuario'
        });
      }
    )
   
  }
}
