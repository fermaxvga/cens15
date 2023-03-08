import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DocentesService } from '../../services/docentes.service';

@Component({
  selector: 'app-cargar-notas',
  templateUrl: './cargar-notas.component.html',
  styleUrls: ['./cargar-notas.component.css']
})
export class CargarNotasComponent implements OnInit {
  id: any;
  materias:any;
  constructor(
  private _router:Router,
  private _route:ActivatedRoute, 
  private _docentesService:DocentesService,
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
       // console.log(params['id']);
        this.id=params['id']; 
        this._docentesService.getMateriasByUserId(this.id).subscribe(
          response=>{
            console.log(response);
            this.materias=response.materias; 
          },
          error=>{
            console.log(<any>error);
          }
        ); 
      }
    );
  }

  listadoAlumnos(materia_id:number, curso_id:number){
    console.log(materia_id,curso_id);
    this._router.navigate(['docentes/cargar-nota-curso',materia_id,curso_id]);  
    
  }

}
