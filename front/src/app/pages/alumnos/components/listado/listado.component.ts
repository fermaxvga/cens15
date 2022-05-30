import { Component, OnInit,DoCheck } from '@angular/core';
import { AlumnosService } from '../../services/alumnos.service';
import { CursosService } from '../../../cursos/services/cursos.service';
import { Router } from '@angular/router';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from '../../../users/services/users.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit,DoCheck {
  alumnos:any; 
  listado:boolean|undefined;
  todos:boolean | undefined;
  mensaje:any;
  filtroAlumno='';
  cursos:any; 
  delete=faTrashAlt;
  edit=faPencilAlt; 
  identity: any;


  constructor(
    private _alumnosService: AlumnosService,
    private _cursosService: CursosService,
    private _router:Router,
    private _userService:UsersService
  ) {
    this.todos=true; 
    this.identity = this._userService.getIdentity();
   }

  ngOnInit(): void {
    this.todosLosAlumnos(); 
  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity();
  }



  todosLosAlumnos(){
    this._alumnosService.getAlumnos().subscribe(
      (response:any)=>{
        this.listado=true;
        if(response.status=='success'){
          console.log(response);
          this.alumnos=response.alumnos; 
        }else{
          console.log(response.message);
          this.mensaje=response.message;
        }
      },
      error=>{
        console.log(<any>error);
      }
    );

  }

  porCurso(){
    this.todos=!this.todos; 
    if(!this.todos){
      console.log('traer por curso');
      this._cursosService.getCursos().subscribe(
        response=>{
          if(response.status=='success'){
            console.log(response.cursos);
            this.cursos=response.cursos; 
            }
        },
        error=>{
          console.log(<any>error)
        }
      );
    }
    if(this.todos){
      this.todosLosAlumnos(); 
    }
  }

  alumnosPorCurso(id_curso:number){
    console.log(id_curso);
    this._router.navigate(['alumnos/listado-por-curso/'+id_curso]);
  }

  eliminarAlumno(alumno:any){
    console.log(alumno); 
    Swal.fire({
      icon:'question',
      title:'Eliminar Alumno',
      text:`¿Esta seguro que desea eliminar al alumno ${alumno.nombre} ${alumno.apellido}?`,
      showConfirmButton:true,
      showCancelButton:true
    }).then(result=>{
      if(result.isConfirmed){
        this._alumnosService.deleteAlumno(alumno.id).subscribe(
          (response:any)=>{
            if(response.status=='success'){
              Swal.fire({
              icon:'success',
              title:`${response.message}`,
              timer:1500
              });
              this.todosLosAlumnos(); 
            }else{
              Swal.fire({
                icon:'error',
                title:`No se pudo eliminar el alumno`,
                timer:1500
                })
            }
          },
          error=>{
            console.log(<any>error);
            Swal.fire({
              icon:'error',
              title:`${<any>error}`,
              timer:1500
              });
          }
        );
      }
    });
  }

}
