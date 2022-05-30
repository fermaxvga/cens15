import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../../services/alumnos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-constancias',
  templateUrl: './constancias.component.html',
  styleUrls: ['./constancias.component.css']
})
export class ConstanciasComponent implements OnInit {
  id:any;
  alumno:any; 
  dia:any;
  mes:any;
  anio:any; 
  fecha:any; 
  inscripcion:any; 
  orientacion:any; 
  salarioFamiliar:boolean=false; 

  constructor(
    private _alumnoService: AlumnosService,
    private _route:ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    this._route.params.subscribe(
      async params=>{
        this.id=+params['id'];
        try{
        this.inscripcion =  await this.getInscripcion(this.id);
        this.inscripcion.dni = this.agregarPuntosDni(this.inscripcion.dni);
        this.anio=this.inscripcion.inscripcion; 
        this.orientacion=this.inscripcion.formal; 
        }catch(err){
          console.log(err);
        }
      }
    );
    let date=new Date();    
    this.fecha=date.toLocaleDateString();
    //this.fecha=date;
    console.log(this.fecha);
    this.separarFecha(this.fecha);

  }

  getAlumno(id:any){
    return new Promise((resolve,reject)=>{
      this._alumnoService.getAlumno(id).subscribe(
        response=>{
          if(response.status=='success'){
            console.log(response);
            this.alumno=response.alumno[0];
         
            this.alumno.dni = this.agregarPuntosDni(this.alumno.dni);
            resolve(this.alumno); 

          }else{
            console.log(response.message);
            resolve(response.message);
          }
        },
        error=>{
          console.log(<any>error);
          reject(<any>error);
        }
      );
    });
  }

  getInscripcion(id:any){
    return new Promise((resolve,reject)=>{
      this._alumnoService.getInscrOrientacion(id).subscribe(
        response=>{
          if(response.status=='success'){
            console.log(response);
            resolve(response.inscripcion);
          }else{
            reject(response.message);  
          }
        },
        error=>{
          console.log(<any>error);
          reject(<any>error);
        }
        );
    });
  }

  separarFecha(fecha:any){
    console.log(fecha.length);
    console.log(fecha.indexOf('/'));
    this.dia=(fecha.substring(0,fecha.indexOf('/')));
    fecha=fecha.slice(fecha.indexOf('/')+1,fecha.length);
    this.mes=(fecha.substring(0,fecha.indexOf('/')));
    fecha=fecha.slice(fecha.indexOf('/')+1,fecha.length);
    this.anio=fecha;
    this.mes=this.meses(parseInt(this.mes)); 
    console.log(this.dia,this.mes,this.anio);
  }

  meses(nro_mes:number){
    switch (nro_mes) {
      case 1:
        return 'enero';
      case 2:
        return 'febrero';
      case 3:
        return 'marzo';
      case 4:
        return 'abril';
      case 5:
          return 'mayo';
      case 6:
          return 'junio';
      case 7:
          return 'julio';
      case 8:
            return 'agosto';
      case 9:
            return 'septiembre';
      case 10:
            return 'octubre';
      case 11:
            return 'noviembre';
      case 12:
            return 'diciembre';
      
    
      default:
        return 'completar mes'; 
    }
  }

  agregarPuntosDni(dni:any){
   let string1=dni.substring(0,2);
   let string2=dni.substring(2,5);
   let string3=dni.substring(5,8);
   let doc=string1+'.'+string2+'.'+string3;
   return doc; 
  }

}
function moment() {
  throw new Error('Function not implemented.');
}

