import { Component, OnInit,DoCheck } from '@angular/core';
import { faBars, faHome, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TemplateService } from '../../services/template.service';
import { UsersService } from '../../../pages/users/services/users.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, DoCheck {

  bar = faBars;
  sigIn = faSignInAlt;
  sigOut = faSignOutAlt;
  verMenu: boolean = false;
  identity:any;
  token:any;
  role: any;
  menuSubscription: Subscription | undefined;
  home=faHome; 



  constructor(
    private _templateService: TemplateService,
    private _userService: UsersService,

  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    console.log('Desde toolbar',this.identity);
    console.log('Desde toolbar',this.token);
    this.menuSubscription = this._templateService.menu_obs.subscribe(
      response => {
        if (response == true) {
          
        } else {
          if (response == false) {
            this.verMenu = false;
          }
        }
      }
    );
  }
  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }


  mostrarMenu() {
    this._templateService.menu_obs.emit(true);
    if (this.verMenu == false) {
      this._templateService.menu_obs.emit(true);
      this.verMenu = true;
    } else {
      if (this.verMenu == true) {
        this._templateService.menu_obs.emit(false);
        this.verMenu = false;
      }
    }
  }

  // logout() {
  //   // console.log("Desloguearse");
  //   this._templateService.identity_obs.emit(1);
  // }

  // logout() {
	// 	this._templateService.identity_obs.subscribe(
	// 		response => {
	// 			if (response == 1) {
	// 				this.desloguearse();
	// 			}
	// 		},
	// 		error => {
	// 			console.log(<any>error);
	// 		})
	// }

	logout() {
		localStorage.removeItem('identity');
		localStorage.removeItem('token');
		this.identity = null;
		this.token = null;
    this._templateService.menu_obs.emit(false);
	}

}
