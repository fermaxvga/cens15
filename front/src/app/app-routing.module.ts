import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/components/home.component';

const routes: Routes = [
  {
    path:'home',component:HomeComponent
  },
  {
     path:'users',
     loadChildren:()=>import('./pages/users/users.module').then(m=>m.UsersModule)
   },
  {
    path:'alumnos',
    loadChildren:()=>import('./pages/alumnos/alumnos.module').then(m=>m.AlumnosModule)
  },
  {
    path:'cursos',
    loadChildren:()=>import('./pages/cursos/cursos.module').then(m=>m.CursosModule)
  },
  {
    path:'materias',
    loadChildren:()=>import('./pages/materias/materias.module').then(m=>m.MateriasModule)
  },
  {
    path:'docentes',
    loadChildren:()=>import('./pages/docentes/docentes.module').then(m=>m.DocentesModule)
  },
  {
    path:'novedades',
    loadChildren:()=>import('./pages/novedades/novedades.module').then(m=>m.NovedadesModule)
  },
  {
   path:'**',
   redirectTo:'home'
 },

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
