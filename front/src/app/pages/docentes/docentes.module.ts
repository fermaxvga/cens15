import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocentesRoutingModule } from './docentes-routing.module';
import { AsignacionComponent } from './components/asignacion/asignacion.component';


@NgModule({
  declarations: [AsignacionComponent],
  imports: [
    CommonModule,
    DocentesRoutingModule
  ],
  exports:[
    AsignacionComponent
  ]
})
export class DocentesModule { }
