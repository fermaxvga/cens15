import { EventEmitter , Injectable  } from '@angular/core';
import { HttpClient, HttpHeaders } 	from '@angular/common/http'; 
import { Observable } 				from 'rxjs'
import { GLOBAL } from 'src/app/shared/models/global';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  url: string | undefined;
  url2: string | undefined; 
  historialInscripciones = new  EventEmitter<boolean>();
  menu_obs = new EventEmitter<boolean>();

  constructor(
    public _http: HttpClient 

  ) {
    this.url = environment.url;
  //  this.url2 = environment.url2;

   }
  //  getAlumnos():Observable<any>{
  //    console.log('buscando alumnos..');
  //   let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
  //   return this._http.get(this.url+'alumnos/listado', {headers: headers});
  // }

  getAlumnos():Observable<any>{
    console.log('buscando alumnos..');
   let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
   return this._http.get(this.url+'alumnos/listado', {headers: headers});
   //return this._http.get(this.url2+'Alumnos', {headers: headers});

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
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'alumnos/'+id,{headers: headers});
  }

  getAlumnoByCurso(id_curso:number):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'alumnos/listado-por-curso/'+id_curso,{headers: headers});
   // return this._http.get(this.url2+'Alumnos/GetAlumnosByCursoId/'+id_curso,{headers: headers});

  }


  sendReinscripcion(id_alumno:number,id_curso:number,anio:number):Observable<any>{
    console.log(id_alumno+'/'+id_curso+'/'+anio);
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'alumnos/reinscribir/'+id_alumno+'/'+id_curso+'/'+anio,{headers: headers});
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

  elminarCiclo(id_alumno:any,id_curso:any):Observable<any>{
    console.log('id_alunmo: ' + id_alumno);
    console.log('id_curso: ' + id_curso);
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'notas/eliminar-ciclo/'+id_alumno+'/'+id_curso,{headers: headers});
  }

  getInscrOrientacion(id_alumno:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'alumnos/inscripcion-orientacion/'+id_alumno,{headers: headers});
  }

  deleteAlumno(id:number):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.delete(this.url+'alumnos/eliminar-alumno/'+id,{headers: headers});
  }
  
  editAlumno(id:number,alumno:any):Observable<any>{
    let json=JSON.stringify(alumno);
    let params = "json="+json;
    console.log(params);
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.put(this.url+'alumnos/editar-alumno/'+id,params,{headers: headers});
  }




  getIdCursoByCurso(curso:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'cursos/id-curso/'+curso,{headers: headers});
  }

  inscripcionMasiva(listado:any):Observable<any>{
    let json=JSON.stringify(listado);
    let params = "json="+json;
    console.log(params);
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.post(this.url+'alumnos/inscripcion-masiva',{headers: headers});
  }

  getCiclosByIdAlumnos(id_alumno:number):Observable<any>{
    let headers= new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'notas/ciclos-alumno/' + id_alumno, {headers:headers});
  }

  deleteCiclo(id_alumno:number,id_curso:number):Observable<any>{
    console.log(id_alumno,id_curso);
    let headers= new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.delete(this.url + 'notas/eliminar-ciclo/'+ id_alumno+'/'+ id_curso, {headers:headers});
  }
}
