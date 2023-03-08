import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AusenciaDocentesComponent } from './components/ausencia-docentes/ausencia-docentes.component';
import { HomeComponent } from './components/home/home.component';
const routes: Routes = [
  {path:'home',component: HomeComponent},
  {path:'ausencia-docentes',component:AusenciaDocentesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NovedadesRoutingModule { }
