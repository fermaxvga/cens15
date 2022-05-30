import { Component, OnInit } from '@angular/core';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from '../../services/users.service';
import { User } from '../../Models/user';
import Swal from 'sweetalert2';
import { CompartidosService } from '../../../../shared/services/compartidos.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  edit=faPencilAlt;
	identity:any;
  nombre:any;
  editarNombre:boolean=false;
  apellido:any;
  editarApellido:boolean=false;
  email:any;
  editarCorreo:boolean=false;
  cambiarPass: boolean=false;
  user:User | undefined;
  dni:any; 
  id:number=0; 
  passValido:boolean=true; 
  password:any; 
  mailValido: boolean=true;
  isValid: boolean=false;
  editando:boolean=false; 
  nameValido: boolean=true;
  surnameValido:boolean=true; 
  errorName:string | undefined;
  errorSurname:string | undefined;
  errorEmail:string | undefined;




  constructor(
    private _userService:UsersService,
    private _compartidosService:CompartidosService,
    private _router: Router
    ) {
    this.identity = this._userService.getIdentity();
    this.nombre=this.identity.name;
   }

  ngOnInit(): void {
    this.apellido=this.identity.surname;  
    this.email=this.identity.email;
    this.dni=this.identity.dni; 
    this.id=this.identity.sub;  
    this.password="";
  }

  ngDocheck(){
    this.identity = this._userService.getIdentity();
    this.nombre=this.identity.name;
    if(!this.identity){
      this._router.navigate(['/']);
    }
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


  cambiarClave(){
    this.cambiarPass=!this.cambiarPass;
    this.editando=true;
    console.log(this.editando);
  }

  actualizarUsuario(){
    this.user=new User('','','','','',0);
    console.log('Actualizar');
    this.user.name=this._compartidosService.capitalizar(this.nombre); 
    this.user.surname=this._compartidosService.capitalizar(this.apellido);
    this.user.email=this._compartidosService.todoMinuscula(this.email);
    this.user.dni=this.dni; 
    this.user.password=this.password;
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
      //Limpio el local storage
      localStorage.removeItem('identity');
      localStorage.removeItem('token');
      this._router.navigate(['/']);
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


  esNameValido(name:string){
  //  console.log(name.length);
      if(name.length==0){
        this.nameValido=false;
        this.errorName="No puede quedar vacío"
      }else{
        var PASS_REGEX=/^[A-Za-z ]+$/;
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
      var PASS_REGEX=/^[A-Za-z ]+$/;
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

  descartarCambios(){
    this.nombre=this.identity.name;
    this.apellido=this.identity.surname;  
    this.email=this.identity.email;
    this.dni=this.identity.dni; 
    this.id=this.identity.sub; 
    this.editando=false;
    this.mailValido=true;
    this.passValido=true;
    this.editarApellido=false;
    this.editarNombre=false;
    this.editarCorreo=false;
    this.cambiarPass=false;
  }

  onSubmit(form:any){
    console.log(form.value);
    Swal.fire({
      icon:'question',
      title:'Modificar Perfil',
      text:'¿Está seguro que desea modificar su perfil?',
      showCancelButton:true,
      showDenyButton:true,
      confirmButtonText:'Modificar',
      denyButtonText:'Descartar',
    }).then((result)=>{
      if(result.isConfirmed){
        this.actualizarUsuario();

      }else{
        Swal.fire({
          title: 'Cambios descartados',
          text: '',
          showConfirmButton:false,
          timer:1200
      });
      this.descartarCambios(); 
      }
    });
  }

}
