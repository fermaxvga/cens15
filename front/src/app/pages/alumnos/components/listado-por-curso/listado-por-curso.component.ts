import { Component, OnInit,DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEye, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from 'src/app/pages/users/services/users.service';
import Swal from 'sweetalert2';
import { AlumnosService } from '../../services/alumnos.service';
import { CursosService } from 'src/app/pages/cursos/services/cursos.service';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { Month } from '../../models/Month';

@Component({
  selector: 'app-listado-por-curso',
  templateUrl: './listado-por-curso.component.html',
  styleUrls: ['./listado-por-curso.component.css']
})
export class ListadoPorCursoComponent implements OnInit,DoCheck {

  id:any|undefined; 
  alumnos:any; 
  filtroAlumno='';
  identity: any;
  delete=faTrashAlt;
  edit=faPencilAlt; 
  varones:number=0;
  mujeres:number=0;
  ver=faEye; 
  anios:any; 
  mes_selected:any; 
  alumnos_filtrados: any;
  meses:any;
  month: Month |undefined;
  fileName: string|undefined;




  constructor(
    private _route: ActivatedRoute,
    private _alumnosService: AlumnosService,
    private _userService:UsersService,
    private _cursosService:CursosService

  ) {
    this.month={mes:'',dias:[]}
  }

  ngOnInit(): void {
    this.calendario(); 
    this._route.params.subscribe(
      params=>{
        this.id=+params['id_curso'];
        console.log(this.id);
        this.getAnios(this.id);
        this.getAlumnosByCurso(this.id);
        }
    );

    // this._alumnosService.getAlumnoByCurso(this.id).subscribe(
    //   (response:any)=>{
    //     console.log(response);
    //     this.alumnos=response.alumnos; 
    //   },
    //   (error:any)=>{
    //     console.log(<any>error); 
    //   }
    // );
  
  }

  mesSelect(){
    console.log(this.mes_selected);
    (this.mes_selected);
  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity();
  }

  calendario(){
    
    this.month={mes:'',dias:[]};
    this.meses=[];
    let mes='';
    moment.locale("es");
    let i=0;
    do{
      this.month={mes:'',dias:[]};
      mes=moment().add(i,'months').format('MMMM');
      let dia=moment().add(i,'months').format('DD');
      let comienzo_mes=(moment().add(i,'months').subtract(parseInt(dia)-1,'days').format());//console.log(dia); 
      let nro_mes=moment().add(i,'months').format('MM');
      this.month.mes=mes;
    //  console.log('Para el mes de: ' + mes+' calcular días, mes nro: ' + nro_mes);
    //  console.log('dia comienzo del mes: '+comienzo_mes);
      let cantDias=this.diasEnUnMes(nro_mes,2023);
      //console.log('tiene '+cantDias+' días');
      let k=0;
        for (let j = 0; j < cantDias; j++) {
          if((moment(comienzo_mes).add(j,'days').format('dd'))!='sá' && (moment(comienzo_mes).add(j,'days').format('dd'))!='do'){

            this.month.dias[k]=moment(comienzo_mes).add(j,'days').format('dd DD'); 
            k++; 
          }
        //  console.log(j); 
    //      console.log(moment(comienzo_mes).add(j,'days').format('dd DD'));
        }     
       
      console.log(this.month);
      this.meses[i]=this.month; 
      i++;
      //this.meses.push(mes);
      
    }while(mes!='diciembre');
    //console.log(this.meses);
  }

  diasEnUnMes(mes:any, año:any) {
    return new Date(año, mes, 0).getDate();
  }

  getAnios(id_curso:any){
    this._cursosService.getAnios(id_curso).subscribe(
      r=>{
        this.anios=r.anios; 
      },
      e=>{
        console.log(<any>e);
      }
  );
  }

  eliminarAlumno(alumno:any){
    console.log(alumno); 
    Swal.fire({
      icon:'question',
      title:'Eliminar Alumno',
      text:`¿Esta seguro que desea eliminar al alumno ${alumno.nombre} ${alumno.apellido}?`,
      showConfirmButton:true,
      showCancelButton:true
    }).then(result=>{
      if(result.isConfirmed){
        this._alumnosService.deleteAlumno(alumno.id).subscribe(
          (response:any)=>{
            if(response.status=='success'){
              Swal.fire({
              icon:'success',
              title:`${response.message}`,
              timer:1500
              });
              this.getAlumnosByCurso(this.id); 
            }else{
              Swal.fire({
                icon:'error',
                title:`No se pudo eliminar el alumno`,
                timer:1500
                })
            }
          },
          error=>{
            console.log(<any>error);
            Swal.fire({
              icon:'error',
              title:`${<any>error}`,
              timer:1500
              });
          }
        );
      }
    });
  }

  getAlumnosByCurso(id:any){
    this._alumnosService.getAlumnoByCurso(id).subscribe(
      (response:any)=>{
        console.log(response);
        this.alumnos=response.alumnos; 
        
        for (const alumno of this.alumnos) {
          if(alumno.sexo=='varon'){
            this.varones++;
          }
          if(alumno.sexo=='mujer'){
            this.mujeres++;
          }
        }
        console.log(this.varones);
        console.log(this.mujeres);

      },
      (error:any)=>{
        console.log(<any>error); 
      }
    );
  }

  filtrarAnio(anio:any){  
    //this.alumnos=this.alumnos.filter((alumno: { inscripcion: any; })=>alumno.inscripcion==anio);

    console.log(anio);
    this.alumnos_filtrados=this.alumnos.filter((alumno: { inscripcion: any; })=>alumno.inscripcion==anio);
  }

  exportarExcel(id:any){
    let f=new Date();
    this.fileName='Asistencia_'+f.getDate()+f.getMonth()+f.getFullYear()+f.getHours()+f.getMinutes()+f.getSeconds()+'.xlsx';
    /* pasar tabla*/
    console.log(id);
    let element =document.getElementById(id);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    // Generar WorkBOOK
    const wb:XLSX.WorkBook=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,"Hoja1");
    var dateTime=new Date();
    // GuardarArchivo
    XLSX.writeFile(wb,this.fileName);
  }

}
