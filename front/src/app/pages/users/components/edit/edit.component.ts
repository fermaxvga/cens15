import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../Models/user';
import { UsersService } from '../../services/users.service';
import { CompartidosService } from '../../../../shared/services/compartidos.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  id:any; 
  editarNombre:boolean=false;
  editarApellido:boolean=false;
  editarCorreo:boolean=false;
  editarRol:boolean=false;
  passValido:boolean=true; 
  mailValido: boolean=true;
  isValid: boolean=false;
  editando:boolean=false; 
  nameValido: boolean=true;
  surnameValido:boolean=true; 
  errorName:string | undefined;
  errorSurname:string | undefined;
  errorEmail:string | undefined;
  usuario:any; 
  edit=faPencilAlt;
  user:any; 
  editarDoc:boolean|undefined;
  cambiarPass: boolean | undefined;
  password:any;
  roles:any; 
  rol:any; 
  identity:any;
  token:any; 
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UsersService,
    private _compartidosService:CompartidosService
  ) { 
    this.password="";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getUser();
    this.getRoles();
    console.log(this.identity);
    if(!this.identity){
        this._router.navigate(['home']);
    }
  }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    if(!this.identity){
      this._router.navigate(['home']);
    }
  }
  getUser(){
    this._route.params.subscribe(
      params=>{
        this.id=+params['id'];
        console.log(this.id);
     //   this._templateService.menu_obs.emit(true);
        this._userService.user_id_obs.emit(this.id);
      }
    );
    this._userService.getUser(this.id).subscribe(
      response=>{
        if(response.status=='success'){  
          console.log(response);
          this.usuario=response.user[0]; 
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  getRoles(){
    this._userService.getRoles().subscribe(
      response=>{
        console.log(response);
        this.roles=response.roles; 
      },
      error=>{
        console.log(<any>error);
      }
    );
  }
  onSubmit(form:any){
  // console.log(form.value.permiso);
   this.actualizarUsuario(form.value.permiso); 
  }

  editarName(){
    this.editarNombre=!this.editarNombre;
    this.editando=true;
    console.log(this.editando);
  }

  editarSurname(){
    this.editarApellido=!this.editarApellido;
    this.editando=true;
    console.log(this.editando);

  }

  editarEmail(){
    this.editarCorreo=!this.editarCorreo; 
    this.editando=true;
    console.log(this.editando);
  }

  editarDni(){
    this.editarDoc=!this.editarDoc; 
    this.editando=true;
    console.log(this.editando);
  }
  editarRole(){
    this.editarRol=!this.editarRol; 
    this.editando=true;
    console.log(this.editando);
  }

  cambiarClave(){
    this.cambiarPass=!this.cambiarPass;
    this.editando=true;
    console.log(this.editando);
  }

  
  descartarCambios(){
    // this.nombre=this.identity.name;
    // this.apellido=this.identity.surname;  
    // this.email=this.identity.email;
    // this.dni=this.identity.dni; 
    // this.id=this.identity.sub; 
    // this.editando=false;
    // this.mailValido=true;
    // this.passValido=true;
    // this.editarApellido=false;
    // this.editarNombre=false;
    // this.editarCorreo=false;
    // this.cambiarPass=false;
  }

  
  esNameValido(name:string){
    //  console.log(name.length);
        if(name.length==0){
          this.nameValido=false;
          this.errorName="No puede quedar vacío"
        }else{
          var PASS_REGEX=/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
          if(name.match(PASS_REGEX)){
                this.nameValido=true;
              }else{
                this.nameValido=false;
                this.errorName="Solo letras"
              }
            }
    //  console.log(this.nameValido);
    }
  
    
    esSurnameValido(surname:string){
      // this.nameValido=false;
      if(surname.length==0){
        this.surnameValido=false;
        this.errorSurname="No puede quedar vacío"
      }else{
        
        var PASS_REGEX=/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
        if(surname.match(PASS_REGEX)){
              this.surnameValido=true;
            }else{
              this.surnameValido=false;
              this.errorSurname="Solo letras"
            }
          }
       console.log(this.surnameValido);
     }
     
  
    esEmailValido(email: string){
      if(email.length==0){
        this.mailValido=false;
        this.errorEmail="No puede quedar vacío"
      }else{
        'use strict';
        var EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
        if (email.match(EMAIL_REGEX)){
          this.mailValido = true;
        }else{
          this.mailValido = false;
          this.errorEmail="Correo inválido"
        }
      }
      //this.mailValido = false;
      console.log(this.mailValido);
    }

    esPassValida(password:string){
      this.passValido=false;
      if(password)
      {
        var PASS_REGEX=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if(password.match(PASS_REGEX)){
          this.passValido=true;
        }
      }
      console.log(this.passValido);
    }


    actualizarUsuario(role_id:any){
      this.user=new User('','','','','','',0);
      console.log('Actualizar');
      this.user.name=this._compartidosService.capitalizar(this.usuario.name); 
      this.user.surname=this._compartidosService.capitalizar(this.usuario.surname);
      this.user.email=this._compartidosService.todoMinuscula(this.usuario.email);
      this.user.dni=this.usuario.email; 
      this.user.password=this.password;
      this.user.role_id=parseInt(role_id); 
      console.log(this.user);
      this._userService.updateUser(this.user,this.id).subscribe(
        response=>{
          console.log(response);
          Swal.fire({
            title: 'Datos Modificados',
            text: '',
            icon: 'success',
            showConfirmButton:false,
            timer:1500
        });
        this._router.navigate(['users/admin']);
        },
        error=>{
          console.log(<any>error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error, no se pudieron modificar los datos',
            icon: 'error',
            showConfirmButton:true,
        });
        }
      );
    }

}
