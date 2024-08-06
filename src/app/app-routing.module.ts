import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './vistas/mae/inicio/inicio.component';
import { InicioUnidadesComponent } from './vistas/unidades/inicio-unidades/inicio-unidades.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(
    [
      { path: 'login', component: LoginComponent },
      //mae  
      { path: 'mae/inicio', component: InicioComponent },

      // unidades
      { path: 'unidades/inicio', component: InicioUnidadesComponent },


      // { path: 'home', component: HomeComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' }
    ]
  )],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
