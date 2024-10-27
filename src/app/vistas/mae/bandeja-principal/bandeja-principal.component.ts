import { Component,OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/servicios/app.service';
import { CorrespondenciaService } from 'src/app/servicios/correspondencia.service';

export interface Totales {
  derivado: number,
  remitido: number,
  aceptado: number,
  destiempo: number,
  concluido: number,
  concluido_gamea: number
}


@Component({
  selector: 'app-bandeja-principal',
  templateUrl: './bandeja-principal.component.html',
  styleUrls: ['./bandeja-principal.component.css'],
 
})
export class BandejaPrincipalComponent {
  constructor(
    private router: Router,
    private correspondenciaService: CorrespondenciaService,
    private appService: AppService
   ) {}
    totales:Totales|null=null;
    
    async ngOnInit() {
      let body= {
        "id_personas":this.appService.userData.id_personas
      }
      let res  = await this.correspondenciaService.obtenerTotales(body);
      this.totales=res.data[0];
    }
    verMasInformacion(estado: String) {
      this.router.navigate(['/mae/detalle'], {
       state: {
        estado: estado ,
        id_personas: this.appService.userData.id_personas }
       }
      ); 
    } 
}
