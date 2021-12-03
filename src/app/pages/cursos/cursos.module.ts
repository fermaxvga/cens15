import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CursosRoutingModule } from './cursos-routing.module';
import { CursosAdminComponent } from './components/cursos-admin/cursos-admin.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { CursoDetailComponent } from './components/curso-detail/curso-detail.component';
import { CursoPorMateriaComponent } from './components/curso-por-materia/curso-por-materia.component';




@NgModule({
  declarations: [CursosAdminComponent, CursoDetailComponent, CursoPorMateriaComponent],
  imports: [
    CommonModule,
    CursosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule,
  ]

})
export class CursosModule { }
