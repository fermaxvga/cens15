import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../../services/alumnos.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  alumnos:any; 

  constructor(
    private _alumnos: AlumnosService
  ) { }

  ngOnInit(): void {
    this._alumnos.getAlumnos().subscribe(
      (response:any)=>{
        if(response.status='success'){
          console.log(response);
          this.alumnos=response.alumnos; 
        }else{
          console.log(response.message);
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

}
