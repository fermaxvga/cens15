import { Component, OnInit } from '@angular/core';
import { CursosService } from 'src/app/pages/cursos/services/cursos.service';
import { MateriaService } from '../../../materias/service/materia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css']
})
export class AsignacionComponent implements OnInit {
  cursos:any; 
  materias: any;
  curso_selected:any;

  constructor(
    public _cursosService:CursosService,
    public _materiasService:MateriaService
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

  traerMaterias(id_curso:number,curso:any,division:any){  
    this.curso_selected=curso+'-'+division; 
    console.log(id_curso);
    this._materiasService.getMateriasByIdCurso(id_curso).subscribe(
      response=>{
        console.log(response);
        if(response.status=='success'){
            console.log(response); 
            this.materias=response.materias; 
            ($('#materias_curso') as any).modal('toggle');

        }else{
          console.log('error al traer las materias');
          console.log(response.message); 

        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  asignarMateria(materia:any){
    Swal.fire({
      title:'Asignar Materia',
      text:`¿Está seguro que desea asignar  la materia ${materia.materia} al docente?`,
      icon:'question',
      showCancelButton:true
    }).then(result=>{
      if(result.isConfirmed){
        Swal.fire({
          icon:'success',
          title:'Materia Asignada correctamente',
          timer:1500
        });
        ($('#materias_curso') as any).modal('hide');

      }
    });
  }

}
