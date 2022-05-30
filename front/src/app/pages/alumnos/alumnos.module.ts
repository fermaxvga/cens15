import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AlumnosRoutingModule } from './alumnos-routing.module';
import { AbmComponent } from './components/abm/abm.component';
import { DetailComponent } from './components/detail/detail.component';
import { ListadoComponent } from './components/listado/listado.component';
import { HomeComponent } from './components/home/home.component';
import { BotoneraAlumnosComponent } from './components/botonera-alumnos/botonera-alumnos.component';

import { InscripcionesComponent } from './components/inscripciones/inscripciones.component';
import { NotasComponent } from './components/notas/notas.component';
import { FiltroPipe } from './pipe/filtro.pipe';
import { ListadoPorCursoComponent } from './components/listado-por-curso/listado-por-curso.component';
import { ConstanciasComponent } from './components/constancias/constancias.component';
import { AutoinscripcionComponent } from './components/autoinscripcion/autoinscripcion.component';
import { NuevoComponent } from './components/nuevo/nuevo.component';
import { FinalAutoInscripcionComponent } from './components/final-auto-inscripcion/final-auto-inscripcion.component';



@NgModule({
  declarations: [
    AbmComponent,
    DetailComponent,
    ListadoComponent, 
    HomeComponent, 
    BotoneraAlumnosComponent, 
    NuevoComponent, 
    InscripcionesComponent, 
    NotasComponent, 
    FiltroPipe, 
    ListadoPorCursoComponent, 
    ConstanciasComponent, 
    AutoinscripcionComponent, FinalAutoInscripcionComponent
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    FormsModule,
    SharedModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  exports:[
    AbmComponent,
    DetailComponent,
    ListadoComponent,
    HomeComponent,
    BotoneraAlumnosComponent,
  ]
})
export class AlumnosModule { }
