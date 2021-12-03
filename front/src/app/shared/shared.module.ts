import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerMasterComponent } from './components/spinner-master/spinner-master.component';



@NgModule({
  declarations: [SpinnerMasterComponent],
  imports: [
    CommonModule
  ],
  exports:[
    SpinnerMasterComponent
  ]
})
export class SharedModule { }
