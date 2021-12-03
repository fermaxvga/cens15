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

  formatearFecha(fecha:string){
    //a partir de un dato del tipo datetime , como created_at o updated_at, devuelve un arreglo, separando año, día, mes hora y minutos.
    let year=fecha.substring(0,4);
    let month=fecha.substring(5,7);
    let day=fecha.substring(8,10);
    let hour=fecha.substring(11,13);
    let minutes=fecha.substring(14,16);
    let date={year,month,day,hour,minutes}; 
    return date; 
  }
}
