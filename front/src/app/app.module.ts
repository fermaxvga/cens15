import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './pages/home/home.module';
import { TemplateModule } from './template/template.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AlumnosModule } from './pages/alumnos/alumnos.module';
import { CursosModule } from './pages/cursos/cursos.module';
import { MateriasModule } from './pages/materias/materias.module';



@NgModule({
  declarations: [
    AppComponent,
     ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TemplateModule,
    HomeModule,
    RouterModule,
    HttpClientModule,
    AlumnosModule,
    CursosModule,
    MateriasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
