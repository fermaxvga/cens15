import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AsignacionComponent } from './components/asignacion/asignacion.component';
import { CargarNotasComponent } from './components/cargar-notas/cargar-notas.component';
import { CargarNotaCursoComponent } from './components/cargar-nota-curso/cargar-nota-curso.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'asignacion',component:AsignacionComponent},
  {path:'cargar-notas/:id',component:CargarNotasComponent},
  {path:'cargar-nota-curso/:id_materia/:id_curso',component:CargarNotaCursoComponent},
  {path:'**',redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocentesRoutingModule { }
