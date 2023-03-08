import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } 	from '@angular/common/http'; 
import { Observable } 				from 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NovedadesService {
  mostrar = new EventEmitter<string>();
  url:any; 
  constructor(
    public _http: HttpClient 
  ) { 
    this.url = environment.url;
  }
  cargarAusencia(ausencia:any):Observable<any>{
    let json = JSON.stringify(ausencia);
    console.log(json);
    let params='json='+json; 
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.post(this.url+'docentes/ausencias',params,{headers: headers});
  }
  getAuencias(date1:any,date2:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'docentes/ausencias/'+date1+'/'+date2,{headers: headers});
  }

  delete(id:number):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.delete(this.url+'docentes/delete-ausencia/'+id,{headers:headers});
  }
}
