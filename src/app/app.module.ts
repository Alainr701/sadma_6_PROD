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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuBarComponent,
    BandejaComponent,
    ConcluidosComponent,
    EntradaCComponent,
    BandejaComponent,
    RecepcionComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
//EJEMPLO