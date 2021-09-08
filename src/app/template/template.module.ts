import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UsersModule } from '../pages/users/users.module';


@NgModule({
  declarations: [FooterComponent,SideBarComponent,FooterComponent,ToolbarComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    UsersModule
  ],
  exports:[
    ToolbarComponent,
    FooterComponent,
    SideBarComponent,
  ]
})
export class TemplateModule { }
