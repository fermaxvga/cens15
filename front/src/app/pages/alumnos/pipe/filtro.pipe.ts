import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultAlumno=[];
    for(const alumno of value){
      if(
        (alumno.nombre.toLowerCase().indexOf(arg.toLowerCase())>-1) ||
        (alumno.apellido.toLowerCase().indexOf(arg.toLowerCase())>-1) ||
        (alumno.dni.toLowerCase().indexOf(arg.toLowerCase())>-1) 
        ){
        resultAlumno.push(alumno); 
      };
    };
    return resultAlumno; 
  }

}
