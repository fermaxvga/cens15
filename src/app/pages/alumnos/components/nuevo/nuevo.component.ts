import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../models/Alumno';
import { AlumnosService } from '../../services/alumnos.service';
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

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
    cuil: false 
  });
  
  constructor(
    private _alumnoService: AlumnosService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
  }

  isValidField(name:string):boolean{
    const fieldName:any=this.alumnForm.get(name);
    return fieldName?.invalid && fieldName?.touched;
  }
  

  ingresarAlumno(newAlumno:any){
    console.log(newAlumno);

  }

  onSubmit():void{
    //console.log('Form->'+JSON.stringify(this.alumnForm.value));
    this._alumnoService.sendAlumno(this.alumnForm.value).subscribe(
      (response:any)=>{
                if(response.status=='success'){
                  console.log(response);
                }else{
                  console.log(response.message);
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
      cuil: false
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

}
