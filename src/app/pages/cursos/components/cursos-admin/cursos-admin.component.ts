import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../services/cursos.service';
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

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
  cursoForm=this.fb.group({
    curso: ['',Validators.required], 
    division: ['',Validators.required],
    especialidad:['',Validators.required],
    modalidad:['',Validators.required],
    semipresencial:false,
  });


  constructor(
    private _cursoService: CursosService,
    private fb:FormBuilder
  
  ) { }

  ngOnInit(): void {
    this.traerDatos();
    this.traerCursos();
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
      title: 'Agregar Curso',
      text: mensaje,
      showConfirmButton:true,
    });
    this.traerCursos();
  //  this.cursoForm.reset();
  }
}


