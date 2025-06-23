import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AlumnosService } from '../../services/alumnos.service';
import { faAddressCard, faBook, faFileContract, faFileSignature, faList, faMarker, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { CompartidosService } from '../../../../shared/services/compartidos.service';
import * as $AB from 'jquery';
import { TemplateService } from '../../../../template/services/template.service';
import { CursosService } from '../../../cursos/services/cursos.service';
import Swal from 'sweetalert2';
import { UsersService } from '../../../users/services/users.service';
import * as moment from 'moment';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit,DoCheck {
  
  alumno:any;
  id_alumno:number|undefined; 
  editar:boolean|undefined; 
  historico:any; 
  edit=faPencilAlt; 
  book=faBook;
  reInscribir=faAddressCard; 
  notas=faMarker; 
  $:any; 
  cursos: any;
  curso:any; 
  cursoSelected:any;
  identity: any;
  token: any;
  constancia=faFileSignature; 
  listado=faList; 
  anios_reinscripcion:number[] | undefined;
  anioRselected:number[] | undefined;


  
  
  constructor(
    private _route: ActivatedRoute,
    private _router:Router, 
    private _alumnoService:AlumnosService,
    private _compartidos:CompartidosService,
    private _templateService: TemplateService,
    private _cursoService:CursosService,
    private _userService: UsersService
  ) { 
    this.editar=false; 
    this.editar=false; 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    const anioActual = moment().year();
    const anioSiguiente = moment().add(1, 'year').year();

    this.anios_reinscripcion = [anioActual, anioSiguiente];

  }

  ngOnInit(): void {
  this._route.params.subscribe(params=>{
    this.id_alumno=+params['id'];
    this.getAlumno(this.id_alumno);
  });
  this.getCursos(); 
}

ngDoCheck(){
  this.identity = this._userService.getIdentity();
  this.token = this._userService.getToken();
}

getAlumno(id:number){
  this._alumnoService.getAlumno(id)
  .subscribe(
    response=>{
      console.log(response);
      console.log(response.alumno[0].dni);
      this.alumno=response.alumno[0]; 
   //   this.alumno.fecha_de_nacimiento=this._compartidos.formatearFecha(this.alumno.fecha_de_nacimiento);
      this.getInscripciones(parseInt(response.alumno[0].dni));
    },
    error=>{
      console.log(<any>error);
    }
 );
}

getInscripciones( dni:any ){
  this._alumnoService.getInscripciones(dni)
  .subscribe(
    response=>{
      console.log(response);
      this.historico=response.historico;
      
    },
    error=>{
      console.log(<any>error);
    }
  );
}

editEnable(){
  this.editar=!this.editar;
}

getHistorico(dni:any){
 // this._templateService.menu_obs.emit(true);

  //console.log(dni);
 // this._materiaService.materiaEditada.emit(true);
 //this._alumnoService.historialInscripciones.emit(true);
 ($('#historialModal') as any).modal('toggle');

 // console.log(dni);
}

getCursos(){
  this._cursoService.getCursos().subscribe(
    response=>{
      console.log(response);
      this.cursos=response.cursos;
      for (let i = 0; i < this.cursos.length; i++) {
        if(this.cursos[i].semipresencial==1){
          this.cursos[i].semipresencial='Semipresencial';
        }
        if(this.cursos[i].semipresencial==0){
          this.cursos[i].semipresencial=' ';
      }

    }
  },
    error=>{
      console.log(<any>error);
    }
  );
}

async reinscribir(curso:any,anio:any){


  try{
    await this.getCurso(curso); 
  }catch(err){
    console.log(err);
  }

  Swal.fire({
    title:'Reinscripción',
    text: `¿Seguro desea reinscribir a ${this.alumno.nombre} en el curso ${this.cursoSelected.curso} ${this.cursoSelected.division} ${this.cursoSelected.especialidad} ${this.cursoSelected.modalidad}`,
    confirmButtonText:'Inscribir',
    showDenyButton:true,
    denyButtonText:'Cancelar',
    reverseButtons:true
  }).then((result)=>{
    if(result.isConfirmed){
      this._alumnoService.sendReinscripcion(this.alumno.id,curso,anio).subscribe(
        response=>{
          if(response.status=='success')
          Swal.fire('Reinscripción Exitosa','','success');
          ($('#reinscribirModal') as any).modal('hide');
        },
        error=>{
          console.log(<any>error)
          Swal.fire('No se pudo realizar la inscripción','Intente luego, o contactesé con un administrador','error');
          ($('#reinscribirModal') as any).modal('hide');
          
        }
      );
    }
  });
}

getCurso(curso:any){
  return new Promise((resolve,reject)=>{
    this._cursoService.getCursoById(curso).subscribe(
      response=>{
        console.log(response);
        this.cursoSelected=response.curso[0]; 
        resolve(true);
      },
      error=>{
        console.log(<any>error);
      }
    );

  });
}

verNotas(){
  console.log('Ver notas');
  this._router.navigate(['alumnos/notas',this.id_alumno]); 
}

constancias(alumno:any){
  this._router.navigate(['alumnos/constancias',alumno.id]); 
}


editarAlumno(alumno:any){
  console.log(alumno); 
  Swal.fire({
    icon:'question',
    title:'Modificar Datos',
    text:'¿Esta seguro que desea modificar los datos para este alumno?',
    showConfirmButton:true,
    showCancelButton:true,
  }).then(result=>{
    if(result.isConfirmed){
      this._alumnoService.editAlumno(alumno.id,alumno).subscribe(
        (response:any)=>{
          console.log(response); 
          if(response.status=='success'){
            Swal.fire({
              icon:'success',
              title:'Datos Modificados Correctamente',
              text:'',
              timer:1500
            });
            this._router.navigate(['alumnos/lista']);
          }
        },
        error=>{
          console.log(<any>error);
            Swal.fire({
              icon:'error',
              title:'Error al modificar datos',
              text:`${<any>error.message}`,
              showConfirmButton:true
            });
          
        }
      );
    }
  });
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
      this._alumnoService.deleteAlumno(alumno.id).subscribe(
        (response:any)=>{
          if(response.status=='success'){
            Swal.fire({
            icon:'success',
            title:`${response.message}`,
            showConfirmButton:false, 
            timer:2000
            });
            this._router.navigate(['/alumnos/lista']);
           // this.todosLosAlumnos(); 
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
