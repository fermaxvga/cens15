import { Component, OnInit } from '@angular/core';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { User } from '../../Models/user';
import { UsersService } from '../../services/users.service';
import { Router} from '@angular/router';
import { CompartidosService } from '../../../../shared/services/compartidos.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  validar:boolean;
  dni:any; 
  buscando: boolean;
  dni_dni: any;
  editar=faPencilAlt;
  usuario:any; 
  password1:any;
  password2:any;
  mailValido:any; 
  passValido: any;
  coincide: boolean; 
  name:any;
  surname:any;
  email:any;
  password:any;
  errorRegistro:boolean; 
  role: any;

  constructor(
    private _userService: UsersService,
    private _router: Router,
    private _compartidosService:CompartidosService
  ) {
    this.validar=false; 
    this.buscando=false;
    this.coincide=false;
    this.errorRegistro=false;
   }

  ngOnInit(): void {
    console.log(this.validar);
    this.usuario=new User('','','','','','',0);
  }

  getDni(){
    this.validar=false; 
    this.buscando=true;
     this._userService.validarDni(this.dni).subscribe(
       (response:any)=>{
        if(response.status=="success"){
            console.log(response);
            this.validar=true; 
            this.buscando=false;
            this.dni_dni=response;
            this.role=response.role; 
            console.log(this.role); 
        }else{
          console.log('Error al buscar DNI');
          this.validar=false; 
          this.dni_dni=response;
          this.buscando=false;
        }
       }, 
       error=>{
         console.log(<any>error)
       }
     );
  }


  

  limpiar(){
    this.dni=null;
    this.dni_dni=null;
    this.validar=false;
    this.coincide=false;
    this.passValido=false;
    this.password1=null;
    this.password2=null;
    this.usuario.name=null;
    this.usuario.surname=null;
    this.usuario.email=null;
    this.usuario.password=null;
  }


  esEmailValido(email: string){
    this.mailValido = false;
      'use strict';
      var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (email.match(EMAIL_REGEX)){
        this.mailValido = true;
      }
  }

  esPassValida(password:string){
    this.passValido=false;
    this.comparar(); 
    if(password)
    {
      var PASS_REGEX=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if(password.match(PASS_REGEX)){
        this.passValido=true;

      }
    }
    console.log(this.passValido);
  }

  comparar(){
    this.coincide=false; 
    if(this.password1==this.password2 && this.passValido){ 
      this.coincide=true; 
      this.usuario.password=this.password1; 
    }
  }

  onSubmit1(){
    this.usuario.dni=this.dni_dni.dni;
  //  this.usuario.name=this.capitalizar(this.usuario.name);
    this.usuario.name=this._compartidosService.capitalizar(this.usuario.name);

    this.usuario.surname=this._compartidosService.capitalizar(this.usuario.surname);
 //  this.usuario.surname=this.capitalizar(this.usuario.surname);
    this.usuario.role=this.role; 
   // this.usuario.email=this.todoMinuscula(this.usuario.email);
    this.usuario.email=this._compartidosService.todoMinuscula(this.usuario.email);
    this.registrarUsuario();
  //  console.log(this.usuario);
  }

  registrarUsuario(){
    this._userService.userRegister(this.usuario).subscribe(
      response=>{
        if(response.status=='success'){
          console.log(response);
          this.errorRegistro=false;
          Swal.fire({
            icon: 'success',
            title: 'Usuario Creado Exitosamente',
            showConfirmButton: false,
            timer: 1500
          });
          this._router.navigate(['users/login']);



        }else{
          this.errorRegistro=response.message;

          console.log('No se pudo registrar el usuario');

          console.log(response.message); 

     

        }
      },
      error=>{
        console.log(<any>error);
        this.error(<any>error.error.message);
      });
  //  console.log(this.usuario); 
  }


  error(message:any){
    Swal.fire({
      icon: 'error',
      title: 'Crear Usuario',
      text:`Error al tratar de crear usuario ${message}`,
      showConfirmButton: true
    });

  }


  
}
