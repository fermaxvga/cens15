import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } 	from '@angular/common/http'; 
import { Observable } 				from 'rxjs'
import { GLOBAL } from 'src/app/shared/models/global';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  url: string | undefined;
  addMateria       =  new  EventEmitter<object>();
  editarMateria    =  new  EventEmitter<any>();
  materiaEditada   =  new  EventEmitter<boolean>();
  materiaAgregada  =  new  EventEmitter<boolean>();



  constructor(
    public _http: HttpClient 
  ) { 
    this.url=environment.url;
  }

  sendMateria(materia:any):Observable<any>{
    let json=JSON.stringify(materia);
    let params = "json="+json;
    console.log(params);
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.post(this.url+'materias/agregar',params,{headers: headers});
  }

  getMaterias():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'materias/listar',{headers: headers});
  }

  getMateriaById(id:number):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'materias/get/'+id,{headers: headers});
  }

  updateMateria(id:number,materia:any):Observable<any>{
    let json=JSON.stringify(materia);
    let params = "json="+json;
    console.log(params);
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.put(this.url+'materias/update/'+id,params,{headers: headers});
  }

  deleteMateria(id:number):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.delete(this.url+'materias/delete/'+id, {headers: headers});
  }


}
