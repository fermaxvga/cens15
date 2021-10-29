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
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id:any; 
  editarNombre:boolean=false;
  editarApellido:boolean=false;
  editarCorreo:boolean=false;
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

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UsersService,
    private _compartidosService:CompartidosService
  ) { 
    this.password="";
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this._route.params.subscribe(
      params=>{
        this.id=+params['id'];
        console.log(this.id);
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
  onSubmit(form:any){
   console.log(form.value);
   this.actualizarUsuario(); 
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


    actualizarUsuario(){
      this.user=new User('','','','','');
      console.log('Actualizar');
      this.user.name=this._compartidosService.capitalizar(this.usuario.name); 
      this.user.surname=this._compartidosService.capitalizar(this.usuario.surname);
      this.user.email=this._compartidosService.todoMinuscula(this.usuario.email);
      this.user.dni=this.usuario.email; 
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
