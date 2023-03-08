import { Component, OnInit, DoCheck } from '@angular/core';
import { UsersService } from 'src/app/pages/users/services/users.service';

@Component({
  selector: 'app-botonera-alumnos',
  templateUrl: './botonera-alumnos.component.html',
  styleUrls: ['./botonera-alumnos.component.css']
})
export class BotoneraAlumnosComponent implements OnInit,DoCheck {
  identity: any;

  constructor(
    private _userService: UsersService
  ) {
    this.identity = this._userService.getIdentity();
   }

  ngOnInit(): void {
  

  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity(); 
  }

}
