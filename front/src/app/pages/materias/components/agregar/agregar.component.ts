import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CursosService } from '../../../cursos/services/cursos.service';
import { MateriaService } from '../../service/materia.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  
  cursos:any;
  nombreMateria:any;
  curso:any;
  profesor1:any;
  profesor2:any;
  cursoSelect: number | undefined;
  

  constructor(
    private _cursoService: CursosService,
    private _materiaService:MateriaService
  ) { }

  ngOnInit(): void {
    this.getCursos(); 
    console.log('Agregar');
  }
  onSubmit(form:any){
    console.log(form.value);
    this._materiaService.sendMateria(form.value).subscribe(
      response=>{
        if(response.status=='success'){
          console.log(response);
          Swal.fire({
            title:'Agregar Materia',
            text:'Materia agregada correctamente',
            icon:'success',
            showConfirmButton:false,
            timer:2000
          });
        }
        this._materiaService.materiaAgregada.emit(true);
      },
      error=>{
        console.log(<any>error); 
        Swal.fire({
          title:'Agregar Materia',
          icon:'error',
          text:`Error al agregar materia ${error.error.message}`,
          showConfirmButton:true
        });
      }
    );
  }

  getCursos(){
    this._cursoService.getCursos().subscribe(
      response=>{
        console.log(response);
        if(response.status=='success'){
          this.cursos=response.cursos;
        }else{
          this.cursos=response.message;
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

}
