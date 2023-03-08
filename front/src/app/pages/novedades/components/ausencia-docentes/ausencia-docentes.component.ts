import { Component, OnInit,DoCheck } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/pages/users/services/users.service';
import { NovedadesService } from '../../services/novedades.service';

@Component({
  selector: 'app-ausencia-docentes',
  templateUrl: './ausencia-docentes.component.html',
  styleUrls: ['./ausencia-docentes.component.css']
})
export class AusenciaDocentesComponent implements OnInit {
  option:Subscription | undefined;
  opcion:any; 
  identity:any;
  token:any;
  constructor(
    private _novedadesService:NovedadesService,
    private _userService:UsersService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();  
   }

  ngOnInit(): void {
    this.option= this._novedadesService.mostrar.subscribe(
      r=>{
        console.log(r);
        this.opcion=r;
      },
    );
  }
  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();  
  }


}
