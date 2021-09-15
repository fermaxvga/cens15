import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MateriasRoutingModule } from './materias-routing.module';
import { ListadoComponent } from './components/listado/listado.component';


@NgModule({
  declarations: [ListadoComponent],
  imports: [
    CommonModule,
    MateriasRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MateriasModule { }
