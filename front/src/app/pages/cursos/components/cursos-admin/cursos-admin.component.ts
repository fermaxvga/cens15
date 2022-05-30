import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../services/cursos.service';
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import * as $AB from 'jquery';
import { UsersService } from '../../../users/services/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cursos-admin',
  templateUrl: './cursos-admin.component.html',
  styleUrls: ['./cursos-admin.component.css']
})
export class CursosAdminComponent implements OnInit {
  cursos:any; 
  nro_cursos:any; 
  divisiones:any;
  especialidades:any; 
  modalidades:any;
  respuesta:any;
  trash=faTrashAlt;
  edit=faPencilAlt;
  cursoActual:any;
  identity:any;
  token:any; 
  $:any; 

  cursoForm=this.fb.group({
    curso: ['',Validators.required], 
    division: ['',Validators.required],
    especialidad:['',Validators.required],
    modalidad:['',Validators.required],
    semipresencial:false,
  });

  cursoToEditForm=this.fb.group({
    curso: ['',Validators.required], 
    division: ['',Validators.required],
    especialidad:['',Validators.required],
    modalidad:['',Validators.required],
    semipresencial:false,
  })




  constructor(
    private _cursoService: CursosService,
    private fb:FormBuilder,
    private _userService: UsersService,
    private _router:Router
    ) { }

  ngOnInit(): void {
    this.traerDatos();
    this.traerCursos();
  }
  ngDoCheck(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    if(!this.identity){
      this._router.navigate(['/']);
    }
  }

  isValidField(name:string):boolean{
    const fieldName:any=this.cursoForm.get(name);
    return fieldName?.invalid && fieldName?.touched;
  }
  
  async traerCursos(){
    try{
      this.cursos = await this.getCursos();
      console.log(this.cursos);
    }catch(error){
      console.log(error);
    }
  }


  async traerDatos(){
    try{
      let resNroCurso:any=await this.getNroCursos();
      (resNroCurso.status=='success')
      ?this.nro_cursos=resNroCurso.nroCursos
      :this.nro_cursos=resNroCurso.message;
    }catch(err){
      console.log(err);
    }
    
    try{
      let resDivisiones:any=await this.getDivisiones();
      (resDivisiones.status=='success')
      ?this.divisiones=resDivisiones.divisiones
      :this.divisiones=resDivisiones.message;
     }catch(err){
      console.log(err);
    }

    try{
      let resEspecialidades:any=await this.getEspecialidades();
      (resEspecialidades.status=='success')
      ?this.especialidades=resEspecialidades.especialidades
      :this.especialidades=resEspecialidades.message;
      
    }catch(err){
      console.log(err);
    }

    try{
      let resModalidad:any=await this.getModalidad();
      (resModalidad.status=='success')
      ?this.modalidades=resModalidad.modalidad
      :this.modalidades=resModalidad.message;
      console.log(this.modalidades);

    }catch(err){
      console.log(err);
    }
  }
  getCursos(){
    return new Promise((resolve,reject)=>{
      this._cursoService.getCursos().subscribe(
        response=>{
          if(response.status=='success'){
            resolve(response.cursos)
          }else{
            console.log(response.message);
            this.cursos=true;
          }
        },
        error=>{
          console.log(<any>error);
          reject(<any>error);
        }
      );
    })
  }


  getNroCursos(){
    return new Promise((resolve,reject)=>{
      this._cursoService.getNroCursos().subscribe(
        response=>{
        console.log(response);
        resolve(response);
      },
      error=>{
        reject(<any>error);
        console.log(<any>error);
      });
    });
  }

  getDivisiones(){
    return new Promise((resolve,reject)=>{
      this._cursoService.getDivisiones().subscribe(
        response=>{
          console.log(response);
          resolve(response);
         },
      error=>{
        reject(<any>error);
        console.log(<any>error);
      })
    });
  }
  
  getEspecialidades(){
    return new Promise((resolve,reject)=>{
      this._cursoService.getEspecialidades().subscribe(
        response=>{
          console.log(response);
          resolve(response);
        },
        error=>{
          console.log(<any>error);
          reject(<any>error); 
        }
      );
    });
  }

  getModalidad(){
    return new Promise((resolve,reject)=>{
      this._cursoService.getModalidad().subscribe(
        response=>{
          console.log(response);
          resolve(response);
        },
        error=>{
          console.log(<any>error);
          reject(<any>error); 
        }
      );
    });
  }

  onSubmit(){
  //  console.log('Form->'+JSON.stringify(this.cursoForm.value));
    this._cursoService.sendCurso(this.cursoForm.value).subscribe(
      response=>{
          if(response.status=='success'){
            this.success(response.message);
          }else{
            this.error(response.message); 
          }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  editarCurso(curso:any):void{
    console.log(curso);
    this.cursoActual=curso;
    ($('#cursoEdit') as any).modal('toggle');

   const cursoToEdit={
      curso: curso.curso, 
      division: curso.division,
      especialidad: curso.especialidad,
      modalidad: curso.modalidad,
      semipresencial:curso.semipresencial,
      }; 
      this.cursoToEditForm?.setValue(cursoToEdit);
  }

  onSubmitUpdate(){
   console.log(this.cursoToEditForm.value); 
   this._cursoService.updateCurso(this.cursoToEditForm.value,this.cursoActual.id).subscribe(
     response=>{
      console.log(response);
      Swal.fire({
        title:'Editar Curso',
        text: `El curso se editó correctamente`,
        showConfirmButton:false,
        icon:'success',
        timer:2000
      });
     },
     error=>{
      console.log(<any>error);
     }
   );
  }

  eliminarCurso(curso:any){
    Swal.fire({
      title: '¿Eliminar Curso?',
      text: `¿Está segur que desea eliminar el curso ${curso.curso} ${curso.division}`,
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor:'Red',
      denyButtonText: `Cancelar`,
      denyButtonColor:'blue',
      reverseButtons:true
    }).then((result) => {
      if(result.isConfirmed){
        this._cursoService.deleteCurso(curso.id).subscribe(
          response=>{
            console.log(response);
            if(response.status=='success'){
              Swal.fire('Curso Eliminado!', '', 'success');
              this.traerCursos();


            }else{
              Swal.fire('No se pudo eliminar el curso!', '', 'error');
              this.traerCursos();
                
            }
          },
          error=>{
            console.log(<any>error);
            Swal.fire('No se pudo eliminar el curso!', '', 'error')

          }
          );
         
      }
    })
  }

  success(mensaje:any){
    Swal.fire({
      icon: 'success',
      title: 'Agregar Curso',
      text: mensaje,
      showConfirmButton:false,
      timer:2000
    });
    this.cursoForm.reset();
    this.traerCursos();
  }

  error(mensaje:any){
    Swal.fire({
      icon: 'error',
      title: 'Agregar o Editar Curso',
      text: mensaje,
      showConfirmButton:true,
    });
    this.traerCursos();
  //  this.cursoForm.reset();
  }
  


}


