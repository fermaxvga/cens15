import { Component, OnInit, DoCheck } from '@angular/core';
import { faListAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from 'src/app/pages/users/services/users.service';
import { NovedadesService } from '../../services/novedades.service';

@Component({
  selector: 'app-novedades-toolbar',
  templateUrl: './novedades-toolbar.component.html',
  styleUrls: ['./novedades-toolbar.component.css']
})
export class NovedadesToolbarComponent implements OnInit,DoCheck{
  listado=faListAlt;
  plus=faPlusCircle;
  identity:any;
  token:any;
  constructor(
    private _novedadesService:NovedadesService,
    private _usersService:UsersService
  ) { 
    this.identity = this._usersService.getIdentity();
    this.token = this._usersService.getToken();
  }

  ngOnInit(): void {
  }
  ngDoCheck() {
    this.identity = this._usersService.getIdentity();
    this.token = this._usersService.getToken();
  }

  opcionAmostrar(opcion:any){
    this._novedadesService.mostrar.emit(opcion);
  }

}
