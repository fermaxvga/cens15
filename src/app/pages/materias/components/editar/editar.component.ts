import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MateriaService } from '../../service/materia.service';
import { CursosService } from '../../../cursos/services/cursos.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  editarMateria:Subscription | undefined; 
  id_materia:any; 
  cursos:any;
  nombreMateria:any;
  cursoActual:any;
  prof1:any;
  prof2:any;
  materiaActual:any;
  cursoSelect:any; 

  constructor(
    private _materiaService:MateriaService,
    private _cursoService:CursosService
  ) { }

  ngOnInit(): void {
      this.editarMateria=this._materiaService.editarMateria.subscribe(response=>{
      this.materiaActual=response; 
      // console.log(this.materia);
      this.nombreMateria=this.materiaActual.materia;
      this.prof1=this.materiaActual.profesor1;
      this.prof2=this.materiaActual.profesor2;
      this.id_materia=this.materiaActual.id;

      console.log(this.nombreMateria);
      this.getCurso(this.materiaActual.id_curso);
      this.getCursos(); 
      //this.getMateriaById(this.id_materia);
    })
  }

getCurso(id:number){
  this._cursoService.getCursoById(id).subscribe(
    response=>{
      console.log(response);
      this.cursoActual=response.curso[0];
    },
    error=>{
      console.log(<any>error);
    }
  );
}

getCursos(){
  this._cursoService.getCursos().subscribe(
    response=>{
      console.log(response);
      this.cursos=response.cursos;
    },
    error=>{
      console.log(<any>error);
    }
  );
}

  onSubmit(form:any){
    console.log(form.value);
    console.log(this.id_materia);
    this._materiaService.updateMateria(this.id_materia,form.value).subscribe(
      response=>{
        console.log(response);
        if(response.status=="success"){
          Swal.fire({
            icon: 'success',
            title: 'Materia Modificada',
            showConfirmButton: false,
            timer: 1500
          });
        }
        this._materiaService.materiaEditada.emit(true);
      },
      error=>{
        console.log(<any>error);
        this.error(<any>error.error.message);
      }
    );
  }

  error(message:any){
    Swal.fire({
      icon: 'error',
      title: 'Modificadar materia',
      text: `Error ${message}`,
      showConfirmButton: true,
    });

  }
}
