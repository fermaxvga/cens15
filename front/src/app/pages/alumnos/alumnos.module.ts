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
import { NuevoComponent } from './components/nuevo/nuevo.component';
import { InscripcionesComponent } from './components/inscripciones/inscripciones.component';
import { NotasComponent } from './components/notas/notas.component';



@NgModule({
  declarations: [AbmComponent,
    DetailComponent,
    ListadoComponent, 
    HomeComponent, 
    BotoneraAlumnosComponent, 
    NuevoComponent, InscripcionesComponent, NotasComponent],
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
    BotoneraAlumnosComponent
  ]
})
export class AlumnosModule { }
