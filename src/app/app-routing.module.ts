import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './vistas/mae/inicio/inicio.component';
import { InicioUnidadesComponent } from './vistas/unidades/inicio-unidades/inicio-unidades.component';
import { BandejaComponent } from './vistas/mae/bandeja/bandeja.component';
import { MenuBarComponent } from './shared/menu-bar/menu-bar.component';
import { BandejaPrincipalComponent } from './vistas/mae/bandeja-principal/bandeja-principal.component';
import { Detalle1Component } from './vistas/mae/bandeja-principal/detalle1/detalle1.component';
import { InitComponent } from './vistas/mae/init/init.component';
import { RecepcionComponent } from './vistas/mae/bandeja/recepcion/recepcion.component';
import { CorrespondenciasComponent } from './vistas/mae/correspondencias/correspondencias.component';
import { FormularioComponent } from './vistas/mae/correspondencias/formulario/formulario.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { UsuariosComponent } from './vistas/usuarios/usuarios.component';
import { ReportesComponent } from './vistas/mae/bandeja/reportes/reportes.component';



const routes: Routes = [
  
  { path: '', component: LoginComponent },
  // login
  { path: 'login', component: LoginComponent },
  //dashboard
  { 
    path: 'mae', component: MenuBarComponent,
     children: [
    { 
      path: '', component: InitComponent,
    },
    {
       path: 'reportes', component: ReportesComponent 

    },

    { 
      path: 'bandeja', component: BandejaComponent,
    },
    { 
      path: 'correspondencias', component: CorrespondenciasComponent,
    },
    { 
      path: 'control', component: BandejaPrincipalComponent ,
    },
    { 
      path: 'asd', component: InitComponent,
    },
   
    {
      path: 'bandeja-principal', component:BandejaPrincipalComponent
    },
    {
      path:'detalle',component:Detalle1Component
    },
  { 
      path: 'usuarios', component: UsuariosComponent 
    },
  
    ] 
},


{ path: 'busqueda_externa', component: BusquedaComponent },




  // { path: 'mae/inicio', component: MenuBarComponent },
  // { path: 'mae/bandeja-principal', component:BandejaPrincipalComponent},
  // { path: 'mae/bandeja', component: BandejaComponent },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },

  // { path: '', component: BandejaPrincipalComponent }, // Ruta principal
  // { path: 'detalle/:id', component: Detalle1Component }, // Ruta para el detalle
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


