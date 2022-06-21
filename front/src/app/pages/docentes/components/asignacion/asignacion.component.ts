import { Component, OnInit } from '@angular/core';
import { CursosService } from 'src/app/pages/cursos/services/cursos.service';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css']
})
export class AsignacionComponent implements OnInit {
  cursos:any; 

  constructor(
    public _cursosService:CursosService 
  ) { }

  ngOnInit(): void {
    this.getCursos(); 
  }

  getCursos(){
    this._cursosService.getCursos().subscribe(
      response=>{
        console.log(response);
        this.cursos=response.cursos;
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

}
