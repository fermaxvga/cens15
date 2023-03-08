import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { TemplateService } from 'src/app/template/services/template.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../Models/user';
import Swal from 'sweetalert2';


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
  logueando:boolean|undefined;


	//loginSubscription: Subscription;

  constructor(
    private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UsersService,
		public _templateService: TemplateService
  ) 
  { 
    this.user=new User('','','','','','',0);
  }


  ngOnInit(): void {
    
  
  }


  onSubmit(form:any){
    Swal.showLoading();
    this.user=new User('','','','','','',0);
   // this._router.navigate(['home']);

    this.user.email=this.email;
    this.user.password=this.password;
   // console.log(this.user);
    //console.log(form.value); 
    //console.log(this.user);
    this.logueando=true;
    this._userService.signup(this.user,false).subscribe(
      response=>{
          //  obtener el Toke
          if(!response?.original?.status){
            this.token=response;
             // console.log('gettoken');
  
            //  console.log('respuesta token',response);
              localStorage.setItem('token',this.token); 
              this._userService.signup(this.user,true).subscribe(
                response=>{
                    
                //  console.log('respuesta user->',response);
                        this.identity=response;
                        Swal.close();

                        localStorage.setItem('identity',JSON.stringify(this.identity));
                        this.notIdentity=false; 
                        this._templateService.menu_obs.emit(false);
                        this._router.navigate(['home']);
                        //obtener objeto de usuario identificado
                      },
                      error=>{
                        console.log(<any>error);
                        this.error(<any>error.message);

                      }
                    );
          }else{
            console.log('Login Error');
            Swal.close();
            this.error('Email y/o contraseña erroneos');
            this.logueando=!this.logueando; 
          }
                  
         //obtener objeto de usuario identificado
          },
          error=>{
            console.log(<any>error);
            this.error(<any>error.message);
            this.notIdentity=true; 
          }
          );
       
  }

  error(message:any){ 
    Swal.fire({
      title:'Error al loguearse',
      text:`${message}`,
      icon:'error',
      showConfirmButton:true,

    });

  }

      
}
