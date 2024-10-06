import { Component,OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';




@Component({
  selector: 'app-bandeja-principal',
  templateUrl: './bandeja-principal.component.html',
  styleUrls: ['./bandeja-principal.component.css'],
 
})
export class BandejaPrincipalComponent {
  constructor(private router: Router) {}

  verMasInformacion(id: number) {
    this.router.navigate(['/detalle', id]); // Redirige al componente hijo con el ID correspondiente
  }
}
