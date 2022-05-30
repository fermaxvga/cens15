import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../../services/cursos.service';
import { UsersService } from '../../../users/services/users.service';

@Component({
  selector: 'app-curso-por-materia',
  templateUrl: './curso-por-materia.component.html',
  styleUrls: ['./curso-por-materia.component.css']
})
export class CursoPorMateriaComponent implements OnInit {
  id: number|undefined;
  curso:any;
  materias:any; 
  preceptores:any; 
  preceptor:any; 
  preceptor_actual: any;
  modificar: boolean | undefined;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _cursosService:CursosService,
    private _users:UsersService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id=+params['id'];
        console.log(this.id);
      }
    );

      this._users.getUsers().subscribe(
        response=>{
          console.log(response); 
          let j=0;
          this.preceptores=[];
          for (let i = 0; i < response.users.length; i++) {
            if(response.users[i].preceptor==1){
              this.preceptores[j]=response.users[i].name + ' ' +response.users[i].surname;
              j++; 
            }
          }
        },
        error=>{
          console.log(<any>error)
        }
      );

    this._cursosService.getCursoById(this.id).subscribe(
      response=>{
        console.log(response);
        this.curso=response.curso[0]; 
      },
      error=>{
        console.log(<any>error);
      }
    );


    this._cursosService.getCursoPorMateria(this.id).subscribe(
      response=>{
        console.log(response);
        this.materias=response.materias; 
      },
      error=>{
        console.log(<any>error);
      }
    );


    this.buscarPreceptores();
  }

  buscarPreceptores(){
    this._cursosService.buscarPreceptores(this.id).subscribe(
      response=>{
        if(response.status=='success'){
          this.preceptor_actual=response.preceptor[0].preceptor;
        }
        console.log(this.preceptor_actual);
      },
      error=>{
        console.log(<any>error);
      }
    );
  }


  asignarPreceptor(){
    console.log(this.preceptor);
    console.log(this.id);
    let asignacion:any;
    asignacion={};
    asignacion.curso_id=this.id;
    asignacion.preceptor=this.preceptor;

    this._cursosService.asignarPreceptor(asignacion).subscribe(
      response=>{
        console.log(response);
        this.preceptor_actual=this.preceptor;
        this.modificar=false;
      },
      error=>{
        console.log(<any>error);
      }
    );

  }

  cambiar_preceptor(){
   this.modificar=!this.modificar; 
  }

}
