import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } 	from '@angular/common/http'; 
import { Observable } 				from 'rxjs'
import { GLOBAL } from 'src/app/shared/models/global';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  url: string | undefined;

  constructor(
    public _http: HttpClient 

  ) {
    this.url = GLOBAL.url;
   }
   getAlumnos():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'alumnos/listado', {headers: headers});
  }
  sendAlumno(alumno:any):Observable<any>{
    let json=JSON.stringify(alumno);
    let params = "json="+json;
    console.log(params);
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.post(this.url+'alumnos/inscribir',params,{headers: headers});
  }

  getAlumno(id:number):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'alumnos/'+id,{headers: headers});
  }

}
