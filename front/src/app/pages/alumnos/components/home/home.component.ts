import { Component, OnInit,DoCheck } from '@angular/core';
import { UsersService } from 'src/app/pages/users/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,DoCheck {
  identity: any;

  constructor(
    private _userService:UsersService
  ) 
  {
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
  }
  ngDoCheck(): void {
    this.identity = this._userService.getIdentity();
  }


}
