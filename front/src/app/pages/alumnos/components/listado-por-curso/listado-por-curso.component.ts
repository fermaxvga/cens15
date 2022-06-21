import { Component, OnInit,DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from 'src/app/pages/users/services/users.service';
import Swal from 'sweetalert2';
import { AlumnosService } from '../../services/alumnos.service';

@Component({
  selector: 'app-listado-por-curso',
  templateUrl: './listado-por-curso.component.html',
  styleUrls: ['./listado-por-curso.component.css']
})
export class ListadoPorCursoComponent implements OnInit,DoCheck {

  id:any|undefined; 
  alumnos:any; 
  filtroAlumno='';
  identity: any;
  delete=faTrashAlt;
  edit=faPencilAlt; 
  varones:number=0;
  mujeres:number=0;



  constructor(
    private _route: ActivatedRoute,
    private _alumnosService: AlumnosService,
    private _userService:UsersService

  ) { }

  ngOnInit(): void {
    
    this._route.params.subscribe(
      params=>{
        this.id=+params['id_curso'];
        console.log(this.id);
        this.getAlumnosByCurso(this.id);
        }
    );

    // this._alumnosService.getAlumnoByCurso(this.id).subscribe(
    //   (response:any)=>{
    //     console.log(response);
    //     this.alumnos=response.alumnos; 
    //   },
    //   (error:any)=>{
    //     console.log(<any>error); 
    //   }
    // );
  
  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity();
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
              this.getAlumnosByCurso(this.id); 
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

  getAlumnosByCurso(id:any){
    this._alumnosService.getAlumnoByCurso(id).subscribe(
      (response:any)=>{
        console.log(response);
        this.alumnos=response.alumnos; 
        
        for (const alumno of this.alumnos) {
          if(alumno.sexo=='varon'){
            this.varones++;
          }
          if(alumno.sexo=='mujer'){
            this.mujeres++;
          }
        }
        console.log(this.varones);
        console.log(this.mujeres);

      },
      (error:any)=>{
        console.log(<any>error); 
      }
    );
  }

}
