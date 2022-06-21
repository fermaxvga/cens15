import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminComponent } from './components/admin/admin.component';
import { EditComponent } from './components/edit/edit.component';
import { PreCargarComponent } from './components/pre-cargar/pre-cargar.component';
import { ListarPreCargadosComponent } from './components/listar-pre-cargados/listar-pre-cargados.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { DocentesModule } from '../docentes/docentes.module';

@NgModule({
  declarations: [
     LoginComponent,
     RegisterComponent,
     AdminComponent,
     EditComponent,
     PreCargarComponent,
     ListarPreCargadosComponent,
     PerfilComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    SharedModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    DocentesModule
  ],
  exports:[
     LoginComponent,
     RegisterComponent,
     EditComponent,
     PreCargarComponent,
     ListarPreCargadosComponent
  ]
})
export class UsersModule { }
