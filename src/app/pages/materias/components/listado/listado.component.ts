import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import { CursosService } from '../../../cursos/services/cursos.service';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  nroCursos:any;
  divisiones:any;
  
  addMateriaForm=this.fb.group({
    materia: ['',Validators.required], 
    curso: ['',Validators.required],
    division:['',Validators.required],
    profesor1:['',Validators.required],
    profesor2:['',Validators.required]
  });

  constructor(
    private fb:FormBuilder,
    private _serviceCurso:CursosService
  ) { }

  ngOnInit(): void {
    this.getNroCursos();
    this.getDivisiones();
  }

  isValidField(name:string):boolean{
    const fieldName:any=this.addMateriaForm.get(name);
    return fieldName?.invalid && fieldName?.touched;
  }
  onSubmit(){

  }

  getNroCursos(){
    this._serviceCurso.getNroCursos().subscribe(
      response=>{
        console.log(response);
        if(response.status=='success'){
          this.nroCursos=response.nroCursos;
        }else{
          this.nroCursos=response.message;
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  getDivisiones(){
    this._serviceCurso.getDivisiones().subscribe(
      response=>{
        console.log(response);
        if(response.status=='success'){
          this.divisiones=response.divisiones;
        }else{
          this.nroCursos=response.message;
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }



}
