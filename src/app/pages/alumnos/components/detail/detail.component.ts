import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AlumnosService } from '../../services/alumnos.service';
import { faAddressCard, faBook, faMarker, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { CompartidosService } from '../../../../shared/services/compartidos.service';
import * as $AB from 'jquery';
import { TemplateService } from '../../../../template/services/template.service';
import { CursosService } from '../../../cursos/services/cursos.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  
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

  
  
  constructor(
    private _route: ActivatedRoute,
    private _router:Router, 
    private _alumnoService:AlumnosService,
    private _compartidos:CompartidosService,
    private _templateService: TemplateService,
    private _cursoService:CursosService
  ) { 
    this.editar=false; 

  }

  ngOnInit(): void {
  this._route.params.subscribe(params=>{
    this.id_alumno=+params['id'];
    this.getAlumno(this.id_alumno);
  });
  this.getCursos(); 
}

getAlumno(id:number){
  this._alumnoService.getAlumno(id)
  .subscribe(
    response=>{
      console.log(response);
      console.log(response.alumno[0].dni);
      this.alumno=response.alumno[0]; 
      this.alumno.fecha_de_nacimiento=this._compartidos.formatearFecha(this.alumno.fecha_de_nacimiento);
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

async reinscribir(curso:any){


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
      this._alumnoService.sendReinscripcion(this.alumno.id,curso).subscribe(
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


}
