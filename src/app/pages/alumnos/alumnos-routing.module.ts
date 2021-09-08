import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './components/listado/listado.component';
import { AbmComponent } from './components/abm/abm.component';
import { DetailComponent } from './components/detail/detail.component';
import { HomeComponent } from './components/home/home.component';
import { NuevoComponent } from './components/nuevo/nuevo.component';

const routes: Routes = [
    {
    path:'',
    children:[
      {path:'listado',component:ListadoComponent},
      {path:'abm',component:AbmComponent},
      {path:'detail/:id',component:DetailComponent},
      {path:'home',component:HomeComponent},
      {path:'nuevo',component:NuevoComponent},

      {path:'**',redirectTo :'home'},


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }



