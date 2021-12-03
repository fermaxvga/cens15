import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AlumnosService } from '../../services/alumnos.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {
  notas:any; 
  cursos:any; 
  alumno:any; 
  editar:any; 
  edit=faEdit;
  constructor(
    private _route:ActivatedRoute,
    private _alumnosService:AlumnosService
  ) { 
    this.editar=false; 
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        let id=+params['id'];
        this.getNotas(id); 
        this.getAlumno(id); 
      }
    );
  }

  getNotas(id:number){
    this._alumnosService.getNotas(id).subscribe(
      response=>{
      console.log(response);
      console.log(response.notas);
      this.notas=response.notas; 
      this.cursos=[{}]; 
      let i=0;
      for(var id_curso in response.notas){
         console.log(id_curso); 
         console.log(response.notas[id_curso]);
         this.cursos[i]=response.notas[id_curso];
         
         i=i+1; 
       }
       console.log(this.cursos); 
      // for (let index = 0; index < response.notas.length; index++) {
      //   console.log(response.notas);
      // }
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
     },
     error=>{
      console.log(error);
     }
  );
  }


}
