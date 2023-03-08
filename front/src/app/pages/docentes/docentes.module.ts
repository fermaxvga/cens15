import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocentesRoutingModule } from './docentes-routing.module';
import { AsignacionComponent } from './components/asignacion/asignacion.component';
import { CargarNotasComponent } from './components/cargar-notas/cargar-notas.component';
import { SharedModule } from '../../shared/shared.module';
import { CargarNotaCursoComponent } from './components/cargar-nota-curso/cargar-nota-curso.component';


@NgModule({
  declarations: [AsignacionComponent, CargarNotasComponent, CargarNotaCursoComponent],
  imports: [
    CommonModule,
    DocentesRoutingModule,
    SharedModule
  ],
  exports:[
    AsignacionComponent
  ]
})
export class DocentesModule { }
