import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocentesRoutingModule } from './docentes-routing.module';
import { AsignacionComponent } from './components/asignacion/asignacion.component';
import { CargarNotasComponent } from './components/cargar-notas/cargar-notas.component';


@NgModule({
  declarations: [AsignacionComponent, CargarNotasComponent],
  imports: [
    CommonModule,
    DocentesRoutingModule
  ],
  exports:[
    AsignacionComponent
  ]
})
export class DocentesModule { }
