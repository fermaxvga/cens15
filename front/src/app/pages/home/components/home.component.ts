import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { UsersService } from '../../users/services/users.service';
import { TemplateService } from 'src/app/template/services/template.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  identity: any;
  token: any;

  constructor(
    private _route:Router,
    private _userService:UsersService,
    private _templateService:TemplateService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken()
   }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    if(this.identity){
      this._templateService.menu_obs.emit(false);
    }
  }
  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

}
