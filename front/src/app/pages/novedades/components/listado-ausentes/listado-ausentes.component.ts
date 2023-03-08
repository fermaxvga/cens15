import { Component, OnInit,DoCheck } from '@angular/core';
import { faSearch, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { Fecha } from 'src/app/pages/alumnos/models/Fecha';
import { UsersService } from 'src/app/pages/users/services/users.service';
import Swal from 'sweetalert2';
import { Dates } from '../../models/Date';
import { NovedadesService } from '../../services/novedades.service';

@Component({
  selector: 'app-listado-ausentes',
  templateUrl: './listado-ausentes.component.html',
  styleUrls: ['./listado-ausentes.component.css']
})
export class ListadoAusentesComponent implements OnInit,DoCheck {
  today:string;
  date1: any;
  date2: any;
  search=faSearch
  verHoy:boolean=true;
  dia:any; 
  ausencias:any; 
  fechas:any;
  dates:any; 
  identity:any;
  token:any;
  borrar=faTrashAlt; 
  constructor(
    private _novedadesService:NovedadesService,
    private _userService:UsersService
  ) {
    this.today=moment().format('DD/MM/YYYY');      
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();  
  }

  async ngOnInit(): Promise<void> {
    this.date1=moment().format();
    this.date2=moment().format();
    console.log(this.today);
    this.dia=moment().locale('es').format('dddd');        
    console.log(this.dia[0].toUpperCase()); 
    this.dia=this.dia[0].toUpperCase()+this.dia.substring(1); 
    console.log(this.dia);  
    try{
      this.ausencias=this.traerListado(this.date1,this.date2); 
    }catch(e){
      this.errorMessage(e);
    }
  }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }


   mostrarListado(){
   // let fechas: string[]=[]; 
  
    this.traerListado(this.date1,this.date2);

    // console.log(this.ausencias);
      // for (const ausencia in this.ausencias) {
      //   console.log(ausencia); 
      //   //fechas.push(ausencia); 
      // }

  }
  traerListado(date1:any,date2:any){
    Swal.showLoading();
   // this.verHoy=false;||
   let fecha1=moment(date1);
   let fecha2=moment(date2);
   let diff=fecha2.diff(fecha1,'days');
   //console.log(fecha2.diff(fecha1,'days'));
    date1=moment(date1).format('YYYY-MM-DD');     
    date2=moment(date2).format('YYYY-MM-DD');     
    //let diff= date2-date1;
   // console.log(diff);
    this.dates=[]; 
    let j=0;
   for (let i = 0; i <= diff; i++) {
      console.log(moment(date1).add(i,'days').format('YYYY-MM-DD')) ;
      let date = new Dates('','','');
      date.fecha=moment(date1).add(i,'days').format('YYYY-MM-DD');
      date.dia=moment(date.fecha).locale('es').format('dddd');
      date.format=moment(date.fecha).format('DD/MM/YYYY');
      console.log(date.dia!='sábado' && date.dia!='domingo');
      if(date.dia!='sábado' && date.dia!='domingo'){
        this.dates[j]=date;
        j++;
      }
    }
   console.log(this.dates);
   // console.log(date1,moment(date1).add(1,'days').format('YYYY-MM-DD'));
      this._novedadesService.getAuencias(date1,date2).subscribe(
        response=>{
          Swal.close();
          console.log(response);
          for (const ausencia of response.ausencias) {
            ausencia.fecha=moment(ausencia.fecha).format('YYYY-MM-DD'); 
          }
         this.ausencias=response.ausencias; 
          //let i=0; 
          //this.fechas=[]; 
         // this.dates = [];
          // for (const ausencia in response.ausencias) {
          //   //console.log(moment(ausencia).locale('es').format('dddd')); 
          //   let date = moment(ausencia).format('YYYY-MM-DD');
          //   let dia = moment(ausencia).locale('es').format('dddd')
          //   console.log(dia); 
          
          //   this.dates[i]=date; 
          //   i++; 
          //   this.fechas.push(dia+' '+date); 
          // }
          console.log(this.fechas);
          
        },
        error=>{
          Swal.close();
          console.log(<any>error);
        }
      );
    }
 

  verAusentesHoy(){
    this.traerListado(moment().format(),moment().format());      
  }

  quitarAusencia(ausencia:any){
    Swal.fire({
      'title':'Eliminar Ausencia',
      'icon':'question',
      'text':`Esta seguro que eliminar la ausencia para el docente ${ausencia.docente}`,
      'showCancelButton':true
    }).then((result) => {
      if(result.isConfirmed){
        this._novedadesService.delete(ausencia.id).subscribe(
          (response: any)=>{
            Swal.fire({
              'title':'Se eliminó la ausencia',
              'icon':'success',
              'showConfirmButton':false ,
              'timer':1500
            });
            this.traerListado(this.date1,this.date2);
          },
          error=>{
            this.errorMessage(<any>error);
          }
        );
      }
    });
  }

  errorMessage(error: any) {
    Swal.fire({
      title: 'Error',
      text: `${error.message}`,
      icon: 'error'
    });
  }

}
