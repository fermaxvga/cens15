import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } 	from '@angular/common/http'; 
import { Observable } 				from 'rxjs'
import { GLOBAL } from 'src/app/shared/models/global';
import { User } from '../Models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
   url: string | undefined;
	 identity: any;
	 token: any;

   preCargado  =  new  EventEmitter<boolean>();

  constructor(
    public _http: HttpClient 
  ) {
    this.url = environment.url;
   }
   
    validarDni(dni:string):Observable<any>{
      console.log(this.url);
      let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
      return this._http.get(this.url+'usuarios/validar-dni/'+dni, {headers: headers});
    }

    userRegister(usuario:any):Observable<any>{
      let json=JSON.stringify(usuario);
      let params = "json="+json;
      console.log(params);
      let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
      return this._http.post(this.url+'usuarios/register',params,{headers: headers});
    }

    signup(user:any,gettoken:boolean): Observable<any>{
      user.gettoken=gettoken; 
      let json = JSON.stringify(user);
      let params = 'json='+json;
    //  console.log(params);
      let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
      return this._http.post(this.url+'usuarios/login', params, {headers: headers});
    }

    getIdentity(){
      let string:string= localStorage.getItem('identity') as any; 
      let identity=JSON.parse(string); 
    //  console.log(identity); 
      if(identity != "undefined"){
        this.identity = identity;
      }else{
        this.identity = null;
      }
    
      return this.identity;
    }

    getToken(){
      let token = localStorage.getItem('token');
      if(token != "undefined"){
        this.token = token;
      }else{
        this.token = null; 
      }
      return this.token; 
     }

     getUsers():Observable<any>{
      let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
      return this._http.get(this.url+'usuarios/listado',{headers: headers});
     }

     precargar(dni:any):Observable<any>{
      let json = JSON.stringify(dni);
      let params = 'json='+json;
      let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
      return this._http.post(this.url+'usuarios/precargar',params,{headers: headers});
     }

     getPrecargados():Observable<any>{
      let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
      return this._http.get(this.url+'usuarios/listar-precargados',{headers: headers});
     }

     delePrecargados(id:number):Observable<any>{
      let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
      return this._http.delete(this.url+'usuarios/delete-precargados/'+id,{headers: headers});
     }

     updateUser(user:User,id:number):Observable<any>{
      let json = JSON.stringify(user);
      let params = 'json='+json;
      console.log(json);
      let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
      return this._http.put(this.url+'usuarios/update/'+id,params,{headers: headers});
     }

     getUser(id:number):Observable<any>{
      let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
      return this._http.get(this.url+'usuarios/usuario/'+id,{headers: headers})
     }

     getRoles():Observable<any>{
      let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
      return this._http.get(this.url+'usuarios/roles',{headers: headers})
     }

     deleteUsuario(id:number):Observable<any>{
      let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
      return this._http.delete(this.url+'usuarios/borrar/'+id,{headers: headers})
     }


}
