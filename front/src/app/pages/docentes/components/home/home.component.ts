import { Component, OnInit, DoCheck } from '@angular/core';
import { UsersService } from 'src/app/pages/users/services/users.service';
import { DocentesService } from '../../services/docentes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,DoCheck {
  identity: any;
  token: any;
  isDocente:boolean|undefined; 

  constructor(
    private _userService: UsersService,
    private _docenteServce: DocentesService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
  
  ngOnInit(): void {
    //console.log(this.identity);
    this._docenteServce.isDocente(this.identity.sub).subscribe(
      response=>{
        console.log(response); 
        if(response.result){
          console.log('es docente')
          this.isDocente=true;  
        }else{
          this.isDocente=false;
        }
      },
      error=>{
        console.log(<any>error); 
      }
    );


  }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
  

}
