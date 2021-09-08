import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosAdminComponent } from './components/cursos-admin/cursos-admin.component';

const routes: Routes = [
  {path:'admin',component:CursosAdminComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
