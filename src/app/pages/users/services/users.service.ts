import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } 	from '@angular/common/http'; 
import { Observable } 				from 'rxjs'
import { GLOBAL } from 'src/app/shared/models/global';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
   url: string | undefined;
	 identity: any;
	 token: any;
  constructor(
    public _http: HttpClient 
  ) {
    this.url = GLOBAL.url;
   }
   
    validarDni(dni:string):Observable<any>{
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
      console.log(params);
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

}
