import { EventEmitter , Injectable  } from '@angular/core';
import { HttpClient, HttpHeaders } 	from '@angular/common/http'; 
import { Observable } 				from 'rxjs'
import { GLOBAL } from 'src/app/shared/models/global';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  url: string | undefined;
  historialInscripciones = new  EventEmitter<boolean>();
  menu_obs = new EventEmitter<boolean>();

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

  getInscripciones(id:number):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    //return this._http.get(this.url+'alumnos/'+id,{headers: headers});
    return this._http.get(this.url+'alumnos/historico-inscripciones/30557223',{headers: headers});
  }

  getAlumno(id:number):Observable<any>{
    console.log('Inscripciones');
    //dni=31409991; 
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'alumnos/'+id,{headers: headers});
  }

  sendReinscripcion(id_alumno:number,id_curso:number):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.put(this.url+'alumnos/reinscribir/'+id_alumno+'/'+id_curso,{headers: headers});
  }

  getNotas(id_alumno:number):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'notas/'+id_alumno,{headers: headers});
  }

  inserNota(nota:any):Observable<any>{
    let json=JSON.stringify(nota);
    let params = "json="+json;
    console.log(params);
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.put(this.url+'notas/insertar-nota',params,{headers: headers});
  }

}
