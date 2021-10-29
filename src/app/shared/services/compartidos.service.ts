import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompartidosService {

  constructor() { }

  capitalizar(string:string) {
    console.log('Capitalizar');
    let corte=string.indexOf(' ');
    if(corte!=-1){
      let nombre1=string.slice(0,corte);
      let nombre2=string.slice(corte+1,string.length);
      let capital1=nombre1.charAt(0).toUpperCase();
      let resto1=nombre1.slice(1).toLocaleLowerCase();
      let capital2=nombre2.charAt(0).toUpperCase();
      let resto2=nombre2.slice(1).toLocaleLowerCase();
      let name=capital1+resto1+' '+capital2+resto2;
      return name;
    }else{
      let capital=string.charAt(0).toUpperCase();
      let resto=string.slice(1).toLocaleLowerCase();
      let word = capital + resto;
      return word
    }
  }


  todoMinuscula(string:string){
    string=string.toLocaleLowerCase();
    return string;
  }
}
