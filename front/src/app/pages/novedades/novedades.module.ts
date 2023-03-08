import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NovedadesRoutingModule } from './novedades-routing.module';
import { HomeComponent } from './components/home/home.component';
import { NovedadesToolbarComponent } from './components/novedades-toolbar/novedades-toolbar.component';
import { AusenciaDocentesComponent } from './components/ausencia-docentes/ausencia-docentes.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListadoAusentesComponent } from './components/listado-ausentes/listado-ausentes.component';
import { CargarAusenciasComponent } from './components/cargar-ausencias/cargar-ausencias.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, NovedadesToolbarComponent, AusenciaDocentesComponent, ListadoAusentesComponent, CargarAusenciasComponent],
  imports: [
    CommonModule,
    NovedadesRoutingModule,
    FontAwesomeModule,
    FormsModule
  ]
})
export class NovedadesModule { }
