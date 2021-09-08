import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } 	from '@angular/common/http'; 
import { Observable } 				from 'rxjs'
import { GLOBAL } from 'src/app/shared/models/global';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  url: string | undefined;

  constructor(
    public _http: HttpClient 
  ) { 
    this.url=GLOBAL.url;
  }
  getCursos():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'cursos/listado', {headers: headers});
  }
  getNroCursos():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'cursos/cursos', {headers: headers});
  }

  getDivisiones():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'cursos/division', {headers: headers});
  }

  getEspecialidades():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'cursos/especialidad', {headers: headers});
  }

  getModalidad():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'cursos/modalidad', {headers: headers});
  }

  sendCurso(curso:any):Observable<any>{
    let json=JSON.stringify(curso);
    let params = "json="+json;
    console.log(params);
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.post(this.url+'cursos/agregar',params,{headers: headers});
  }




}
