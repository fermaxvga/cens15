import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } 	from '@angular/common/http'; 
import { Observable } 				from 'rxjs'
import { GLOBAL } from 'src/app/shared/models/global';
import { environment } from 'src/environments/environment';
import { CursosService } from '../../cursos/services/cursos.service';


@Injectable({
  providedIn: 'root'
})
export class DocentesService {
  url: string | undefined;

  constructor(
    public _http: HttpClient,
  ) { 
    this.url = environment.url;
  }

  isDocente(id_user:number):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'docentes/validar/'+id_user, {headers: headers});
  }

  asignarDocente(id_user:number,id_materia:number,revista:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'docentes/asignar-materia/'+id_user+'/'+id_materia+'/'+revista, {headers: headers});
  }

  getMateriasByUserId(id_user:number):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'docentes/mis-materias/'+id_user, {headers: headers});
  }




}
