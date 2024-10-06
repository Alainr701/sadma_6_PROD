import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './vistas/mae/inicio/inicio.component';
import { InicioUnidadesComponent } from './vistas/unidades/inicio-unidades/inicio-unidades.component';
import { BandejaComponent } from './vistas/mae/bandeja/bandeja.component';
import { MenuBarComponent } from './shared/menu-bar/menu-bar.component';
import { BandejaPrincipalComponent } from './vistas/mae/bandeja-principal/bandeja-principal.component';
import { Detalle1Component } from './vistas/mae/bandeja-principal/detalle1/detalle1.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'mae', component: MenuBarComponent },
  { path: 'mae/inicio', component: InicioComponent },
  // { path: 'mae/inicio', component: MenuBarComponent },
  { path: 'mae/bandeja-principal', component:BandejaPrincipalComponent},
  { path: 'mae/bandeja', component: BandejaComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: '', component: BandejaPrincipalComponent }, // Ruta principal
  { path: 'detalle/:id', component: Detalle1Component }, // Ruta para el detalle
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


