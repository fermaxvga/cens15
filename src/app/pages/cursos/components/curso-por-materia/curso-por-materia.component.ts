import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-curso-por-materia',
  templateUrl: './curso-por-materia.component.html',
  styleUrls: ['./curso-por-materia.component.css']
})
export class CursoPorMateriaComponent implements OnInit {
  id: number|undefined;
  curso:any;
  materias:any; 

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _cursosController:CursosService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id=+params['id'];
        console.log(this.id);
      }
    );

    this._cursosController.getCursoById(this.id).subscribe(
      response=>{
        console.log(response);
        this.curso=response.curso[0]; 
      },
      error=>{
        console.log(<any>error);
      }
    );


    this._cursosController.getCursoPorMateria(this.id).subscribe(
      response=>{
        console.log(response);
        this.materias=response.materias; 
      },
      error=>{
        console.log(<any>error);
      }
    );

    

    }

}
