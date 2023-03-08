import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './components/listado/listado.component';
import { AbmComponent } from './components/abm/abm.component';
import { DetailComponent } from './components/detail/detail.component';
import { HomeComponent } from './components/home/home.component';
import { NotasComponent } from './components/notas/notas.component';
import { ListadoPorCursoComponent } from './components/listado-por-curso/listado-por-curso.component';
import { ConstanciasComponent } from './components/constancias/constancias.component';
import { AutoinscripcionComponent } from './components/autoinscripcion/autoinscripcion.component';
import { NuevoComponent } from './components/nuevo/nuevo.component';
import { FinalAutoInscripcionComponent } from './components/final-auto-inscripcion/final-auto-inscripcion.component';
import { BoletinComponent } from './components/boletin/boletin.component';
import { InscripcionesComponent } from './components/inscripciones/inscripciones.component';

const routes: Routes = [
    {
    path:'',
    children:[
      {path:'lista',component:ListadoComponent},
      {path:'listado-por-curso/:id_curso',component:ListadoPorCursoComponent},
      {path:'abm',component:AbmComponent},
      {path:'detail/:id',component:DetailComponent},
      {path:'home',component:HomeComponent},
      {path:'nuevo',component:NuevoComponent},
      {path:'notas/:id',component:NotasComponent},
      {path:'constancias/:id',component:ConstanciasComponent},
      {path:'autoinscripcion',component:AutoinscripcionComponent}, 
      {path:'final-auto-inscripcion',component:FinalAutoInscripcionComponent},
      {path:'boletin/:id_alumno',component:BoletinComponent},
      {path:'inscripcion-masiva',component:InscripcionesComponent},

      {path:'**',redirectTo :'home'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }



