import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } 	from '@angular/common/http'; 
import { Observable } 				from 'rxjs'
import { GLOBAL } from 'src/app/shared/models/global';
import { environment } from '../../../../environments/environment';
import { Ruta } from '../models/Ruta';


@Injectable({
  providedIn: 'root'
})
export class CursosService {
  url: string | undefined;

  constructor(
    public _http: HttpClient 
  ) { 
    this.url=environment.url;
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


  updateCurso(curso:any, id:number):Observable<any>{
    let json=JSON.stringify(curso);
    let params = "json="+json;
    console.log(params);
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.put(this.url+'cursos/update/'+id,params,{headers: headers});
  }

  getCurso(curso:any,division:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'cursos/consultar/'+curso+'/'+division, {headers: headers});
  }

  getCursoById(id:number|undefined):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'cursos/consultar/'+id, {headers: headers});
  }
  
  deleteCurso(id:number):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.delete(this.url+'cursos/delete/'+id, {headers: headers});
  }

  getCursoPorMateria(id_curso:number|undefined):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'cursos/materias-curso/'+id_curso, {headers: headers});
  }

  asignarPreceptor(asignacion:any):Observable<any>{
    let json=JSON.stringify(asignacion);
    let params = "json="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.post(this.url+'cursos/preceptor',params,{headers: headers});
  }

  buscarPreceptores(id_curso:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'cursos/preceptor/'+id_curso,{headers: headers});
  }

  getAnios(id_curso:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'cursos/anios/'+id_curso,{headers: headers});
  }

  getRutas():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'cursos/rutas',{headers: headers});
  }

  postRutas(rutaCompleta:Ruta | undefined):Observable<any>{
    let json=JSON.stringify(rutaCompleta);
    console.log(json);
    let params = "json="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.post(this.url+'cursos/rutas',params,{headers: headers});
  }





}
