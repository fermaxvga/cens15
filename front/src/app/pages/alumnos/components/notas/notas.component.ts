import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AlumnosService } from '../../services/alumnos.service';
import { faDownload, faEdit, faEraser, faList, faListAlt } from '@fortawesome/free-solid-svg-icons';
import { Curso } from '../../models/Cursos';
import Swal from 'sweetalert2';
import { UsersService } from '../../../users/services/users.service';
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';




@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit, DoCheck {
  notas: any;
  cursos: any = [Curso];
  alumno: any;
  editar: any;
  edit = faEdit;
  borrar = faEraser;
  id_cursos: any = [];
  id_alumno: number = 0;
  identity: any;
  token: any;
  ausente = 'A';
  download = faDownload;
  editarNota: boolean = false;
  nota_to_edit: any;
  cuatrimestre_to_edit: any;
  cursos_id: any;
  ciclos: any;
  datos=faListAlt;
  listado=faList; 

  constructor(
    private _route: ActivatedRoute,
    private _alumnosService: AlumnosService,
    private _userService: UsersService
  ) {
    this.editar = false;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id_alumno = +params['id'];
        this.getNotas(this.id_alumno);
        this.getAlumno(this.id_alumno);
      }
    );
  }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

  }

  getNotas(id: number) {
    this._alumnosService.getNotas(id).subscribe(
      response => {
        console.log('GET NOTAS');
        console.log(response);
        console.log(response.notas);
        this.notas = response.notas;
        this.cursos_id = response.cursos_id;
        console.log(this.notas);
        this.cursos = response.cursos;
        let j = 0;

        for (const curso in this.cursos) {
          console.log(curso);
          this.id_cursos[j] = curso;
          j++;
        }
        for (const curso in this.cursos) {
          for (const curso_id in this.cursos_id) {
            if (curso_id == curso) {

            }
          }
        }
        console.log(this.id_cursos);
        console.log(this.cursos);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getAlumno(id: number) {
    this._alumnosService.getAlumno(id).subscribe(
      response => {
        console.log(response);
        this.alumno = response.alumno;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  editEnable() {
    this.editar = !this.editar;
  }

  modifNota(nota: any, cuatrimestre: number) {
    this.editarNota = true;
    this.cuatrimestre_to_edit = cuatrimestre;
    console.log(cuatrimestre);
    this.nota_to_edit = nota;
    console.log(this.editarNota);
    console.log(nota);
    //  this._alumnosService.inserNota(nota).subscribe(
    //    response=>{
    //     console.log(response);
    //     this.getNotas(this.id_alumno); 
    //    },
    //    error=>{
    //     console.log(error);
    //    }
    // );
  }

  editNota(nota: any) {
    Swal.showLoading();
    this._alumnosService.inserNota(nota).subscribe(
      response => {
        console.log(response);
        this.getNotas(this.id_alumno);
        Swal.close();
      },
      error => {
        console.log(error);
        Swal.close();
      }
    );

  }

  borrarCiclos(curso: any) {
    //console.log('Borrar Ciclo',curso,this.id_alumno);
    console.log(curso);
    this._alumnosService.getIdCursoByCurso(curso).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    );
    Swal.fire({
      title: '¿Eliminar Ciclo?',
      text: `Antes de eliminar, apunte las notas obtenidas, las mismas se pederán ¿continuar?`,
      showDenyButton: true,
      confirmButtonText: 'Eliminar Ciclo',
      confirmButtonColor: 'Red',
      denyButtonText: `Cancelar`,
      denyButtonColor: 'blue',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this._alumnosService.elminarCiclo(curso, this.alumno.id).subscribe(
          response => {
            if (response.status == 'success') {
              Swal.fire('Ciclo Eliminado!', '', 'success');
              this.getAlumno(this.alumno.id);
            }
          },
          error => {
            console.log(<any>error);
            Swal.fire('Error: ' + error.status, error.message, 'error');
          }
        );
      }
    });
  }
  modificarAusente1(nota: any) {
    nota.cuatrimestre1 = 1;
  }
  modificarAusente2(nota: any) {
    nota.cuatrimestre2 = 1;
  }
  modificarAusenteDiciembre(nota: any) {
    nota.diciembre = 1;
  }
  modificarAusenteFebrero(nota: any) {
    nota.febrero = 1;
  }

  deleteCiclo(id_alumno: any) {
    console.log(id_alumno);

    this._alumnosService.getCiclosByIdAlumnos(id_alumno).subscribe(
      response => {
        this.ciclos = response.ciclos;
        ($('#eliminarCiclo') as any).modal('toggle');
      },
      error => {
        console.log(<any>error);

      }
    );
  }

  pdf() {
    var canvas = document.getElementById('boletin');
    domtoimage.toPng(canvas).then((dataUrl: string) => {
      let imagen = new Image();
      imagen.src = dataUrl;
      let pdf = new jsPDF('p', 'mm', 'A4');
      pdf.addImage(imagen, 10, 25, 280, 155);
      pdf.save('boletin.pdf');
    }
    );
  }

  borrarCiclo(id_alumno: number,id_curso: number) {
    Swal.fire({
      icon: 'warning',
      title: 'Eliminar Ciclo',
      text: '¿Esta seguro que quiere borrar este curso del registro del alumno? No podrá recuperarlo después',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._alumnosService.deleteCiclo(id_alumno,id_curso).subscribe(
          response => {
            console.log(response); 
            Swal.fire({
              icon: 'success',
              title: 'Curso eliminado',
              timer: 2000,
              showConfirmButton: false
            });
            this.getNotas(this.id_alumno);
            this.getAlumno(this.id_alumno);
            ($('#eliminarCiclo') as any).modal('hide');
          },
          error => {
            console.log(<any>error);
            this.errorMessage(<any>error);
          }
        );
      }

    });
  }


  errorMessage(error: any) {
    Swal.fire({
      title: `Error ${error.status}`,
      text: `Error en la petición. Código: ${error.message}`,
      icon: "error",
      showConfirmButton: true,
    });
  }




}
