import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursoPorMateriaComponent } from './components/curso-por-materia/curso-por-materia.component';
import { CursosAdminComponent } from './components/cursos-admin/cursos-admin.component';

const routes: Routes = [
  {path:'admin',component:CursosAdminComponent},
  {path:'detalle/:id',component:CursoPorMateriaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
