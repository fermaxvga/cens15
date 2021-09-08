import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  menu_obs = new EventEmitter<boolean>();
  login_obs= new EventEmitter<boolean>(); 
  identity_obs=new EventEmitter<number>();
  prueba_obs = new EventEmitter<boolean>(); 

  constructor() { }
}
