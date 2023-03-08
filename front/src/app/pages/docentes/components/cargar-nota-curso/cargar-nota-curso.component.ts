import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from 'src/app/pages/alumnos/services/alumnos.service';
import { MateriaService } from 'src/app/pages/materias/service/materia.service';

@Component({
  selector: 'app-cargar-nota-curso',
  templateUrl: './cargar-nota-curso.component.html',
  styleUrls: ['./cargar-nota-curso.component.css']
})
export class CargarNotaCursoComponent implements OnInit {
  id_curso:any;
  id_materia:any;
  alumnos:any; 
  materia:any; 
  error:any; 

  constructor(
    private _alumnosService:AlumnosService,
    private _materiaService:MateriaService,
    private _route: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    this._route.params.subscribe(async params => {
      console.log(params);   
      this.id_curso = params['id_curso'];
      this.id_materia= params['id_materia'];
      try{
      this.alumnos = await this.getAlumnosByCurso(this.id_curso);
      this.materia = await this.getMateriaById(this.id_materia); 
      }catch(err) {
        console.log(err);
        this.error=err; 
      }
  });
}
  getAlumnosByCurso(id_curso:number){
    return new Promise((resolve, reject) => {
      this._alumnosService.getAlumnoByCurso(id_curso).subscribe(
        response=>{
          console.log(response);
          if(response.status==='success'){
            console.log(response.alumnos);
            resolve(response.alumnos);
          }else{
            console.log(response.message); 
            reject(response.message);
          }
        },
        error=>{
          console.log(<any>error);
          reject(<any>error);
        }); 
    });
  }

  getMateriaById(id_materia:number){
    return new Promise((resolve, reject) =>{
      this._materiaService.getMateriaById(id_materia).subscribe(
        response=>{
          console.log(response);
          if(response.status==='success'){
            resolve(response.materia);
          }
        },
        error=>{
          console.log(<any>error);
          reject(<any>error);
        }
      );
    });
  }

}
