import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { EditComponent } from './components/edit/edit.component';
import { PreCargarComponent } from './components/pre-cargar/pre-cargar.component';
import { ListarPreCargadosComponent } from './components/listar-pre-cargados/listar-pre-cargados.component';
import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes=[
  {
    path:'',
    children:[
      {path:'login',component:LoginComponent},
      {path:'register',component:RegisterComponent},
      {path:'admin',component:AdminComponent},
      {path:'edit/:id',component:EditComponent},
      {path:'pre-cargar',component:PreCargarComponent},
      {path:'listar-pre-cargados',component:ListarPreCargadosComponent},
      {path:'perfil',component:PerfilComponent}

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
