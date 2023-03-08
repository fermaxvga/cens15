import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NovedadesService } from '../../services/novedades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cargar-ausencias',
  templateUrl: './cargar-ausencias.component.html',
  styleUrls: ['./cargar-ausencias.component.css']
})
export class CargarAusenciasComponent implements OnInit {
  today:string | undefined;
  datos_docente:any;
  fecha1:any;
  fecha2:any; 
  constructor(
    private _novedadesService:NovedadesService
  ) {
    this.today = moment().format('YYYY-MM-DD'); 
   }

  ngOnInit(): void {
    
  }

  onSubmit(form:any){
    Swal.fire({
      title: 'Cargar Ausencia',
      text: `¿Cargar la ausencia para el docente ${form.value.docente}`,
      icon: 'question',
      showCancelButton: true
    }).then((result) => {
      if(result.isConfirmed){
        console.log(form.value);
        this.fecha1=moment(this.fecha1).format('YYYY-MM-DD');
        this.fecha2=moment(this.fecha2).format('YYYY-MM-DD');
        console.log(this.fecha1, this.fecha2);
        this._novedadesService.cargarAusencia(form.value).subscribe(
          response=>{
            console.log(response);
            this.datos_docente=null;
            this.fecha1=null;
            this.fecha2=null;
            Swal.fire({
              title:'Ausencia cargada correctamente',
              icon: 'success',
              timer:1500
            });
          },
          error=>{
            console.log(<any>error);
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
