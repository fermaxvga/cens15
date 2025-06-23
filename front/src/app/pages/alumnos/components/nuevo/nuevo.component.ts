import { Component, OnInit, DoCheck, EventEmitter } from '@angular/core';
import { Alumno } from '../../models/Alumno';
import { AlumnosService } from '../../services/alumnos.service';
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import { CursosService } from '../../../cursos/services/cursos.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/pages/users/services/users.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';


@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit,DoCheck {
  cursos:any; 
  cursosPresencial:any;
  cursosSemipresencial:any; 
  id_curso:any;
  years:any; 
  identity:any;
  rutasSemipresencial:any; 
  modoPresencial:boolean=true; 

  private isEmail:string='^[a-zA-Z0-9.%+-]+@[a-z0-9•-]+.[a-z]{2,4}$';


  alumnForm=this.fb.group({
    nombre: ['',[Validators.required,Validators.minLength(3)]],
    apellido: ['',[Validators.required,Validators.minLength(3)]],
    dni: ['',[Validators.pattern('^[0-9]*$'),Validators.minLength(6)]],
    fecha_de_nacimiento: ['',Validators.required],
    domicilio: ['',Validators.required],
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
    ruta:0,
    modalidad_cursado_id:1,
    inscripcion:0
  });
  cursosRuta: any;
  
  constructor(
    private _alumnoService: AlumnosService,
    private _cursoService: CursosService,
    private fb:FormBuilder,
    private _router:Router,
    private _usersService: UsersService
  ) { 
    this.identity=this._usersService.getIdentity();
  }

  ngOnInit(): void {
    this.getCursos();
    this.yearGenerations(); 
    this.getRutas(); 
    this.identity=this._usersService.getIdentity();
    if((this.identity?.role!=1 && this.identity?.role!=2) || !this.identity){
      this._router.navigate(['alumnos/home']);
    }
  }

  yearGenerations(){
    this.years=[];
    let currentMonth=moment().month();
    let yearLimit:number;
    let year:number;
    //**A partir de octubre pueden querer inscribir para el año proximo */
    if(currentMonth>=10){
      //**Sumamos 1 al año actual 
      //**(por alguna razón moment().year() devuelvo 1 año menor al actual) */
      yearLimit=moment().year()+2;
    }else{
      yearLimit=moment().year()+1;
    }
    year=yearLimit-5;
    let i=0;
    while(year<yearLimit){
   //   console.log(year);
      this.years[i]=year; 
      i++;
      year++; 
    } 
    //**Se ordena descendente */
    this.years.sort((a:any, b:any) => b - a);
  }

  ngDoCheck(): void {
    this.identity=this._usersService.getIdentity();
    if((this.identity?.role!=1 && this.identity?.role!=2) || !this.identity){
      this._router.navigate(['alumnos/home']);
    }
  }



  isValidField(name:string):boolean{
    const fieldName:any=this.alumnForm.get(name);
    return fieldName?.invalid && fieldName?.touched;
  }
  

  ingresarAlumno(newAlumno:any){
    console.log(newAlumno);
  }

  onSubmit():void{
    console.log('Form->'+JSON.stringify(this.alumnForm.value));
    this._alumnoService.sendAlumno(this.alumnForm.value).subscribe(
      (response:any)=>{
                if(response.status=='success'){
                  console.log(response);
                  Swal.fire({
                    title: 'Inscripción',
                    text: 'Alumno Inscripto',
                    icon: 'success',
                    showConfirmButton:false,
                    timer:1500
                });
                this._router.navigate(['alumnos/listado']);
              }else{
                  console.log(response.message);
                  Swal.fire({
                    title: 'Inscripción',
                    text: `${response.message}`,
                    icon: 'error',
                    showConfirmButton:false,
                    timer:1500
                });
                }
                
      },
      error=>{
        console.log(<any>error);

      }
    );
  }

  onSetDefault():void{
    const defAlum={
      nombre:  'Juan' ,
      apellido: 'Lopez',
      dni:     '30557223' ,
      fecha_de_nacimiento: '1984-01-04',
      domicilio: 'Castelli 1290' ,
      loc_nac: 'Capital Federal' ,
      prov_nac: 'Buenos Aires',
      pais_nac: 'Argentina' ,
      tel_alumno: '11-68905432' ,
      email:  'jlopezuniq@nativity.com.ar',
      nombre_tutor: 'Carlos Lopez' ,
      tel_tutor: '11-66543123 ' ,
      fot_dni: true,
      cert_estudio: true ,
      pase: false ,
      cuil: false,
      curso:8,
      inscripcion:2021
      }; 
      this.alumnForm.setValue(defAlum);
  }

  onPatchValue():void{
    this.alumnForm.patchValue({pais_nac:'Uruguay'});
  }
  
  onSetValue():void{
    this.alumnForm.setValue({nombre:'José'});
  }
  onReset():void{
    this.alumnForm.reset();
  }

  getCursos(){
    this._cursoService.getCursos().subscribe(
      response=>{
        console.log(response);
        this.cursos=response.cursos;
        this.cursosSemipresencial=[];
        this.cursosPresencial=[]; 
        let j=0;
        let k=0;
        for (let i = 0; i < this.cursos.length; i++) {
          if(this.cursos[i].semipresencial==1){
            this.cursosSemipresencial[j]=this.cursos[i];
            j++;
          }else{
            this.cursosPresencial[k]=this.cursos[i];
            k++; 
          }
        }
        console.log(this.cursosPresencial, this.cursosSemipresencial); 
    },
      error=>{
        console.log(<any>error);
      }
    );
  }

  getRutas(){
    this._cursoService.getRutas().subscribe(
      (response:any)=>{
      console.log(response);
      this.rutasSemipresencial=response.rutas; 
      },
      (error:any)=>{
      console.log(<any>error);
      }
    );
  }

  getCursosByIdRuta(event:any){
    let id_ruta=event.target.value;
    if(id_ruta){

      console.log(id_ruta); 
      this._cursoService.getCursosByIdRuta(id_ruta).subscribe(
        (response:any)=>{
          this.cursosRuta=response.cursos;
          //   console.log(response)
        },
        error=>{
          console.log(<any>error); 
        }
        );
    }else{
      this.cursosRuta=null; 
    }
  }

  elegirModalidad(event:any){
    console.log(event);
   let modo = event.target.id;
    if(modo=='presencial'){
      this.modoPresencial=true; 
      this.cursosRuta=null;
      this.alumnForm.value.modalidad_cursado_id=1;
      this.alumnForm.value.ruta=0; 
    }
    if(modo=='semipresencial'){
      this.modoPresencial=false;
      this.alumnForm.value.modalidad_cursado_id=2;
      this.alumnForm.value.curso=0;
    
    }
    console.log(this.alumnForm.value); 
  }

}
