import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MateriasRoutingModule } from './materias-routing.module';
import { ListadoComponent } from './components/listado/listado.component';
import { SharedModule } from '../../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AgregarComponent } from './components/agregar/agregar.component';
import { EditarComponent } from './components/editar/editar.component';


@NgModule({
  declarations: [ListadoComponent, AgregarComponent, EditarComponent],
  imports: [
    CommonModule,
    MateriasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FontAwesomeModule
  ],
  exports:[
    AgregarComponent,
    EditarComponent
  ]
})
export class MateriasModule { }
