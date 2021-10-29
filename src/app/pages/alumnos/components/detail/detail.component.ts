import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from '../../services/alumnos.service';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  
  alumno:any;
  editar:boolean|undefined; 
  edit=faPencilAlt; 

  constructor(
    private _route: ActivatedRoute,
    private _alumnoService:AlumnosService
  ) { 
    this.editar=false; 
  }

  ngOnInit(): void {
  this._route.params.subscribe(params=>{
    let id=+params['id'];
    this.getAlumno(id);
  });
}

getAlumno(id:number){
  this._alumnoService.getAlumno(id).subscribe(
    response=>{
      console.log(response);
      this.alumno=response.alumno[0]; 
    },
    error=>{
      console.log(<any>error);
    }
    
  );
}

editEnable(){
  this.editar=!this.editar;
}


}
