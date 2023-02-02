import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/inicio/bienvenida/bienvenida.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { RegisterComponent } from './components/inicio/register/register.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContenidosComponent } from './components/dashboard/contenidos/contenidos.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full'},
  { path: 'inicio', component: InicioComponent, children: [
    { path: '', component: BienvenidaComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
  ]},
  {path: 'dashboard', component: DashboardComponent, children:[
    {path: '', component: ContenidosComponent}
  ]},
  { path: '**', redirectTo: '/inicio', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }