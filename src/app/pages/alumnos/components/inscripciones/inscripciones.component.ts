import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../../services/alumnos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css']
})
export class InscripcionesComponent implements OnInit {
  historical:Subscription | undefined; 
  historico:any; 

  constructor(
    private _alumnosService:AlumnosService
  ) { }

  ngOnInit(): void {
    this.historical = this._alumnosService.historialInscripciones.subscribe(
      response=>{
        console.log(response);
      }
    );
    console.log(this.historical);

  }

  // this.menuSubscription= this._templateService.menu_obs.subscribe(
  //   response=>{
  //    console.log(response);
  //     if(response==true){
  //       console.log('Mostrar el Menú');
  //       this.activar='active';
  //     }else{
  //       if(response==false){
  //         console.log('No mostrar el Menú');
  //         this.activar='';
  //       }
  //     }
  //   },
  //   error=>{
  //     console.log(<any>error);
  //   }
  // );

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

}
