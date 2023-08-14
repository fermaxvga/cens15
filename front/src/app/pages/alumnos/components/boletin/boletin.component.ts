import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/pages/users/services/users.service';
import { AlumnosService } from '../../services/alumnos.service';
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import { faArrowLeft, faDownload } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';

@Component({
  selector: 'app-boletin',
  templateUrl: './boletin.component.html',
  styleUrls: ['./boletin.component.css']
})
export class BoletinComponent implements OnInit {
  id_alumno:any; 
  notas: any;
  cursos: any;
  id_cursos: any;
  alumno: any;
  download=faDownload; 
  left=faArrowLeft; 
  promedio_general: number| undefined;
  dia:any; 
  mes:any;
  anio:any; 
  courses: any[]| undefined;

  constructor(
    private _route:ActivatedRoute,
    private _alumnosService:AlumnosService,
    private _userService:UsersService
  ) { 
    moment.locale('es');
    this.mes=moment().format('MMMM');
    this.anio=moment().format('YYYY');
    this.dia=moment().format('DD');

  }

  async ngOnInit(): Promise<void> {
    this._route.params.subscribe(
      async params=>{
        this.id_alumno=+params['id_alumno'];
        console.log(this.id_alumno);
        this.getNotas(this.id_alumno); 
        this.getAlumno(this.id_alumno); 
      }
    );
 
  }

  getNotas(id:number){
    return new Promise((resolve, reject) =>{
      console.log(id);
      this._alumnosService.getNotas(id).subscribe(
        response=>{
          console.log(response);
          console.log(response.notas);
          this.notas=response.notas; 
          this.promedioGeneral(this.notas);
          console.log(this.notas);
          this.cursos=response.cursos; 
          let j=0;
          this.id_cursos=[];
          for(const curso in this.cursos){
            console.log(curso);
            this.id_cursos[j]=curso; 
            j++;
          }
          this.courses=[];
          for (let i = 0; i < this.notas.length; i++) {
            this.courses[i]=this.notas[i].curso; 
            
          }
          this.courses=this.courses.filter((item, index)=>{
            return this.courses?.indexOf(item)==index; 
          });
          
          console.log(this.id_cursos);
          console.log(this.courses);
        },
        error=>{
          console.log(<any>error); 
        }
        );
        
      })
    }
  
  promedioGeneral(notas:any){
    let notaFinal=0;
    for (const nota of notas) {
      if(nota.cuatrimestre1!==null || nota.cuatrimestre2!==null){
        notaFinal++;
      }
      if(notaFinal === notas.length){
        console.log('ciclo completado');
        console.log(notas.length);
        let sum=0;
        for(let i=0;i<notas.length;i++){
          sum+=notas[i].final_anual;
        }
        console.log(sum);
        let prom=sum/notas.length;
        this.promedio_general=parseFloat(prom.toFixed(2)); 
      }
    }
  }

  getAlumno(id:number){
    this._alumnosService.getAlumno(id).subscribe(
      response=>{
        console.log(response);
        this.alumno=response.alumno[0];
        this.alumno.apellido=this.alumno.apellido.toUpperCase();
        console.log(this.alumno); 
      },
      error=>{
        console.log(<any>error); 
      }
    );
  }

  pdf() {
    var canvas = document.getElementById('boletin');
    domtoimage.toPng(canvas).then((dataUrl: string) => {
      let imagen = new Image();
      imagen.src = dataUrl;
      let pdf = new jsPDF('p', 'mm', 'A4');
        pdf.addImage(imagen, 0, 0, 0, 0);
        pdf.save(this.alumno.apellido+'-'+this.alumno.nombre+'-boletin-1erCuat.pdf');
    }
    );
  }

}
function toUppercase(apellido: any): any {
  throw new Error('Function not implemented.');
}

