import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../../services/alumnos.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { CursosService } from 'src/app/pages/cursos/services/cursos.service';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css']
})
export class InscripcionesComponent implements OnInit {
  historical:Subscription | undefined; 
  historico:any; 
  selectedFile: File| undefined;
  mje:any;
  formato: boolean|undefined;
  ExcelData:any; 
  cursos: any;
  curso_destino:any; 
  anio_inscripcion:any; 

  constructor(
    private _alumnosService:AlumnosService,
    private _cursoService: CursosService
  ) { }

  ngOnInit(): void {
    this.historical = this._alumnosService.historialInscripciones.subscribe(
      response=>{
        console.log(response);
      }
    );
    console.log(this.historical);
    this.getCursos();

  }
  getCursos(){
    this._cursoService.getCursos().subscribe(
      response=>{
        this.cursos=response.cursos; 
        console.log(this.cursos);
      },error=>{
        console.log(<any>error);
      }
    );
  }

  getInscripciones( dni:any ){
    this._alumnosService.getInscripciones(dni).subscribe(
      response=>{
        console.log(response);
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  cargarArchivo(event:any) {
    Swal.showLoading();
    console.log("Función - cargarArchivo");
    this.selectedFile = <File>event.target.files[0];
    Swal.close();
    console.log(this.selectedFile);
    this.formato=this.validarFormato(this.selectedFile.name); 
    if(this.formato){
      let fileReader= new FileReader();
      fileReader.readAsBinaryString(this.selectedFile);

      fileReader.onload=(e)=>{
        var workBook = XLSX.read(fileReader.result,{type:'binary'});
        var sheetNames = workBook.SheetNames; 
        this.ExcelData= XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
        for (const data of this.ExcelData) {
          if(data.sexo=='M'){
            data.sexo = 'hombre'; 
          }
          if (data.sexo=='F') {
            data.sexo = 'mujer'; 
          }
        }
        console.log(this.ExcelData);
      }
    }
      // if (this.selectedFile && this.formato) {
      //   this.mje='Formato inválido';
        
      // }else{
      //   this.mje='Formato inválido';
      // }
  }
  validarFormato(fileName:any) {
    let format = fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);
    if (format === 'xlsx') {
      console.log('formato ', format);
      return true;
    } else {
      return false;
    }
  }

  inscribirListado(){
    Swal.fire(
      {
        'icon':'question',
        'title':'Inscribir Listado',
        'text':'¿Esta seguro que desea inscribir todo el listado?',
        'showCancelButton':true,
      }
    ).then(result=>{
      if(result.isConfirmed){
        this.inscipcionMasiva();
    //  this.successMessage('Se inscribió la lista');
      }
    });
  }

  inscipcionMasiva(){
    for (const data of this.ExcelData) {
        data.anio=this.anio_inscripcion; 
        data.curso=this.curso_destino;
        data.dni=data.dni; 
    }
    console.log(this.ExcelData);
    this._alumnosService.inscripcionMasiva(this.ExcelData).subscribe(
      response=>{
        console.log(response);
        if(response.status=='success'){

          this.successMessage('Listado Guadado Correctamente'); 
          this.ExcelData=null; 
        }else{
          Swal.fire({
            'title': 'Error',
            'icon': 'error',
          });
        }
      },
      error=>{
        this.errorMessage(<any>error); 
        console.log(<any>error); 
      } 
    );
  }

  successMessage(mensaje:string){
    Swal.fire({
      'icon':'success',
      'title':`${mensaje}`,
      'timer':2000
    });
  }

  errorMessage(error:any){
    Swal.fire({
      'icon':'error',
      'title':`Error en la petición: ${error.status}`,
      'text':error.error.message,
    });
  }

  
}
