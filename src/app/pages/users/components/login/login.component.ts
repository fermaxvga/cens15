import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { TemplateService } from 'src/app/template/services/template.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../Models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UsersService]
})
export class LoginComponent implements OnInit {
  user: User | undefined;
	token:any;
	identity:any;
	role:any;
	status: any;
	activar: string = '';
  email:any;
  password:any;
  loginSubscription: Subscription | undefined;
  notIdentity:boolean=false;


	//loginSubscription: Subscription;

  constructor(
    private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UsersService,
		public _templateService: TemplateService
  ) 
  { 
    this.user=new User('','','','','');
 
  }


  ngOnInit(): void {
    
  
  }


  onSubmit(form:any){
    this.user=new User('','','','','');
   // this._router.navigate(['home']);

    this.user.email=this.email;
    this.user.password=this.password;

    //console.log(form.value); 
    //console.log(this.user);
    this._userService.signup(this.user,false).subscribe(
      response=>{
          //  obtener el Token
            this.token=response;
            console.log('gettoken');
            console.log(response);
            localStorage.setItem('token',this.token); 
                  this._userService.signup(this.user,true).subscribe(
                    response=>{
                      this.identity=response;
                      localStorage.setItem('identity',JSON.stringify(this.identity));
                      this.notIdentity=false; 
                      this._templateService.menu_obs.emit(true);
                      this._router.navigate(['home']);

                      //obtener objeto de usuario identificado
                    },
                    error=>{
                      console.log(<any>error)
                    }
                  );
       
        //obtener objeto de usuario identificado
          },
          error=>{
            console.log(<any>error);
            this.notIdentity=true; 
          }
          );
       
  }

      
}
