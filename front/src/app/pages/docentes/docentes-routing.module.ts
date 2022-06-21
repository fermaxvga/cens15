import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AsignacionComponent } from './components/asignacion/asignacion.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'asignacion',component:AsignacionComponent},
  {path:'**',redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocentesRoutingModule { }
