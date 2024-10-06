import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import the FormsModule


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuBarComponent } from './shared/menu-bar/menu-bar.component';
import { BandejaComponent } from './vistas/mae/bandeja/bandeja.component';
import { ConcluidosComponent } from './vistas/mae/bandeja/concluidos/concluidos.component';
import { EntradaCComponent } from './vistas/mae/bandeja/entrada-c/entrada-c.component';
import { RecepcionComponent } from './vistas/mae/bandeja/recepcion/recepcion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { GameaComponent } from './vistas/mae/bandeja/gamea/gamea.component';
import { DestiempoComponent } from './vistas/mae/bandeja/destiempo/destiempo.component';
import { CabezeraComponent } from './shared/cabezera/cabezera.component';
import { Detalle1Component } from './vistas/mae/bandeja-principal/detalle1/detalle1.component';
import { InitComponent } from './vistas/mae/init/init.component';
import { HojaRutaComponent } from './vistas/mae/hoja-ruta/hoja-ruta.component';
import { CorrespondenciasComponent } from './vistas/mae/correspondencias/correspondencias.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuBarComponent,
    BandejaComponent,
    ConcluidosComponent,
    EntradaCComponent,
    BandejaComponent,
    RecepcionComponent,
    GameaComponent,
    DestiempoComponent,
    CabezeraComponent,
    Detalle1Component,
    InitComponent,
    HojaRutaComponent,
    CorrespondenciasComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
//EJEMPLO