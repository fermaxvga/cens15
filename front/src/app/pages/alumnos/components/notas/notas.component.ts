import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AlumnosService } from '../../services/alumnos.service';
import { faEdit, faEraser } from '@fortawesome/free-solid-svg-icons';
import { Curso } from '../../models/Cursos';
import Swal from 'sweetalert2';
import { UsersService } from '../../../users/services/users.service';



@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit,DoCheck {
  notas:any; 
  cursos:any=[Curso];
  alumno:any; 
  editar:any; 
  edit=faEdit;
  borrar=faEraser; 
  id_cursos: any=[];
  id_alumno:number=0; 
  identity: any;
  token: any;
  constructor(
    private _route:ActivatedRoute,
    private _alumnosService:AlumnosService,
    private _userService:UsersService
  ) { 
    this.editar=false; 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id_alumno=+params['id'];
        this.getNotas(this.id_alumno); 
        this.getAlumno(this.id_alumno); 
      }
    );
  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

  }

  getNotas(id:number){
    this._alumnosService.getNotas(id).subscribe(
      response=>{
      console.log(response);
      console.log(response.notas);
      this.notas=response.notas; 
      console.log(this.notas);
      this.cursos=response.cursos; 
      let j=0;
      for(const curso in this.cursos){
        console.log(curso);
        this.id_cursos[j]=curso; 
        j++;
      }
      console.log(this.cursos);
      console.log(this.cursos);
    },
      error=>{
        console.log(<any>error); 
      }
    );
    }

  getAlumno(id:number){
    this._alumnosService.getAlumno(id).subscribe(
      response=>{
        console.log(response);
        this.alumno=response.alumno; 
      },
      error=>{
        console.log(<any>error); 
      }
    );
  }

  editEnable(){
  this.editar=!this.editar;     
  }

  modifNota(nota:any){
   console.log(nota);  
   this._alumnosService.inserNota(nota).subscribe(
     response=>{
      console.log(response);
      this.getNotas(this.id_alumno); 
     },
     error=>{
      console.log(error);
     }
  );
  }

  borrarCiclo(curso:any){
    console.log('Borrar Ciclo',curso,this.alumno.id);
    Swal.fire({
      title: '¿Eliminar Ciclo?',
      text: `Antes de eliminar, apunte las notas obtenidas, las mismas se pederán ¿continuar?`,
      showDenyButton: true,
      confirmButtonText: 'Eliminar Ciclo',
      confirmButtonColor:'Red',
      denyButtonText: `Cancelar`,
      denyButtonColor:'blue',
      reverseButtons:true
    }).then((result) => {
      if(result.isConfirmed){

              this._alumnosService.elminarCiclo(curso,this.alumno.id).subscribe(
                response=>{
                  if(response.status=='success'){
                    Swal.fire('Ciclo Eliminado!', '', 'success');      
                    this.getAlumno(this.alumno.id);
                  }
                },
                error=>{
                  console.log(<any>error);
                  Swal.fire('Error: '+error.status, error.message, 'error');
                }
              ); 
          }
            }); 
  }
}
