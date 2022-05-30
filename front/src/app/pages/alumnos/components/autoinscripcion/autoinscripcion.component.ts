import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import { AlumnosService } from '../../services/alumnos.service';
import { CursosService } from '../../../cursos/services/cursos.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'app-autoinscripcion',
  templateUrl: './autoinscripcion.component.html',
  styleUrls: ['./autoinscripcion.component.css']
})
export class AutoinscripcionComponent implements OnInit {

  cursos:any; 
  id_curso:any;

  private isEmail:string='^[a-zA-Z0-9.%+-]+@[a-z0-9•-]+.[a-z]{2,4}$';

  alumnForm=this.fb.group({
    nombre: ['',[Validators.required,Validators.minLength(3)]],
    apellido: ['',[Validators.required,Validators.minLength(3)]],
    dni: ['',[Validators.pattern('^[0-9]*$'),Validators.minLength(6)]],
    fecha_de_nacimiento: ['',Validators.required],
    domicilio: ['',Validators.required],
    sexo: ['',Validators.required],
    loc_nac: ['',Validators.required] ,
    prov_nac: ['',Validators.required] ,
    pais_nac: ['Argentina'] ,
    tel_alumno: ['',Validators.required] ,
    email: ['',[Validators.pattern('^[^@]+@[^@]+\.[a-zA-Z]{2,}$')]] ,
    nombre_tutor: [''] ,
    tel_tutor: [''] ,
    fot_dni: false ,
    cert_estudio: false ,
    pase: false ,
    cuil: false,
    curso:0,
    inscripcion:2022
  });
  cursos_semi: any;
  

  constructor(    
    private fb:FormBuilder,
    private _alumnoService: AlumnosService,
    private _cursoService: CursosService,
    private _router:Router
    ) { }

  ngOnInit(): void {
    this.getCursos();
  }

  isValidField(name:string):boolean{
    const fieldName:any=this.alumnForm.get(name);
    return fieldName?.invalid && fieldName?.touched;
  }

  onSubmit():void{
    console.log(this.alumnForm.value);
    this._alumnoService.sendAlumno(this.alumnForm.value).subscribe(
      (response:any)=>{
                if(response.status=='success'){
                  console.log(response);
             console.log(this.alumnForm.value);
              Swal.fire({
                title: 'Inscripción Guardada',
                text: 'Gracias por tu aporte',
                icon: 'success',
                showConfirmButton:true,
                
            });
              this._router.navigate(['alumnos/final-auto-inscripcion']);
              }else{
                  if(response.status=='repetead'){
                    Swal.fire({
                      title: 'Inscripción',
                      text: `Atención!. Ya tenemos un alumno cargado con este DNI`,
                      icon: 'error',
                      showConfirmButton:true
                  });
                  }
              }
      },
      error=>{
        console.log(<any>error);
        Swal.fire({
          title: 'Inscripción',
          text: `No pudimos registrar tu inscripción. Intenta mas tarde`,
          icon: 'error',
          showConfirmButton:true
      });

      }
    );
  }

  getCursos(){
    this._cursoService.getCursos().subscribe(
      response=>{
        console.log(response);
        this.cursos=response.cursos;
          console.log(this.cursos);
          this.cursos_semi=[]; 
          let j=0; 
          for (let i = 0; i < this.cursos.length; i++) {
          if(this.cursos[i].semipresencial==1){
            this.cursos[i].semipresencial='Semipresencial';
            this.cursos_semi[j]=this.cursos[i];
            j++; 
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

}
