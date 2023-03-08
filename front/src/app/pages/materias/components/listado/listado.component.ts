import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import { CursosService } from '../../../cursos/services/cursos.service';
import { MateriaService } from '../../service/materia.service';
import Swal from 'sweetalert2';
import * as $AB from 'jquery';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';



@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {


  materias:any;
  materiaActual:any; 
  trash=faTrashAlt;
  edit=faPencilAlt;
  materiaEditada:Subscription | undefined;
  materiaAgregada: Subscription | undefined;

  addMateriaForm=this.fb.group({
    materia: ['',Validators.required], 
    curso: ['',Validators.required],
    division: ['',Validators.required],
    profesor1:['',Validators.required],
    profesor2:['',Validators.required]
  });
  cursoSelect: any;
  errorCurso: any;
  mensaje: any;

  constructor(
    private fb:FormBuilder,
    private _cursoService:CursosService,
    private _materiaService:MateriaService
  ) { }

  ngOnInit(): void {
 
      this.getMaterias();
      this.materiaEditada=this._materiaService.materiaEditada.subscribe(
        response=>{
          if(response){
            ($('#editarMateria') as any).modal('hide');
            this.getMaterias();
          }
      });

      this.materiaAgregada=this._materiaService.materiaAgregada.subscribe(
        response=>{
          if(response){
            console.log('recibido desde agregar materia');
            ($('#agregarMateria') as any).modal('hide');
            this.getMaterias();
          }
      });
  }

  isValidField(name:string):boolean{
    const fieldName:any=this.addMateriaForm.get(name);
    return fieldName?.invalid && fieldName?.touched;
  }

  getMaterias(){
    this._materiaService.getMaterias().subscribe(
      (response:any)=>{
        if(response.status=='success'){
          this.materias=response.materias;
          console.log(this.materias);
        }
        if(response.status=='vacio'){
          console.log(response);
          this.mensaje=response.message;
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  editarMateria(materia:any){
    console.log(materia);
    this._materiaService.editarMateria.emit(materia);
  }

  eliminarMateria(materia:any){
    Swal.fire({
      title:  `¿Seguro desea eliminar la materia ${materia.materia}?` ,
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      this._materiaService.deleteMateria(materia.id).subscribe(
          response=>{
              if(response.status=='success'){
                console.log(response);
                if (result.isConfirmed) {
                  Swal.fire({
                        title:'Eliminar Materia', 
                        text:'Materia Eliminada',
                        icon:'success',
                        showConfirmButton:false,
                        timer:1500
                        });
                this.getMaterias();
                }
              }else{
                console.log('No se pudo elimnar la materia');
                if (result.isConfirmed) {
                  Swal.fire({
                    title:'Eliminar Materia', 
                    text:'No se pudo eliminar la materia, intente luego o consulte con un adminsitrador del sistema',
                    icon:'error',
                    showConfirmButton:true
                    });
                  }
              }
              this.getMaterias();
          },
          error=>{
            console.log(<any>error);
            Swal.fire({
              title:'Eliminar Materia', 
              text: `Error al tratar de eliminar ${<any>error}`,
              icon:'error',
              showConfirmButton:true
              });
          });
    })
  }



}
