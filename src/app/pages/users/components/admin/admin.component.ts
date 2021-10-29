import { Component, OnInit, DoCheck } from '@angular/core';
import { faEdit, faTrashAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit,DoCheck {
  usuarios:any; 
  edit=faEdit;
  trash=faTrashAlt;
  userPlus=faUserPlus;
  identity:any;
  token:any; 
  precargado:Subscription | undefined; 
  constructor(
    private _userService:UsersService,
    private _router:Router
  ) { 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    if(!this.identity){
      this._router.navigate(['/']);
    }
    this.getUsers(); 
    this.precargado=this._userService.preCargado.subscribe(
      response=>{
        if(response){
          ($('#precargar') as any).modal('hide');
        }
    });
  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    if(!this.identity){
      this._router.navigate(['/']);
    }
  }


  getUsers(){
    this._userService.getUsers().subscribe(
      response=>{
          console.log(response);
          this.usuarios=response.users; 
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

}
