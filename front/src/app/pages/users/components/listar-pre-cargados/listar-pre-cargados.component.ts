import { Component, OnInit,DoCheck } from '@angular/core';
import { faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-listar-pre-cargados',
  templateUrl: './listar-pre-cargados.component.html',
  styleUrls: ['./listar-pre-cargados.component.css']
})
export class ListarPreCargadosComponent implements OnInit,DoCheck {

  precargados:any;
  trash=faTrashAlt; 
  todos:boolean=true;
  noRegistrados:boolean|undefined;
  registrados:boolean|undefined; 
  identity:any;
  token:any;
  role: any;
  

  constructor(
    private _userService:UsersService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

  ngOnInit(): void {
    this.getPrecargados(); 
    }

    ngDoCheck(){
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
    }
  filtrar(filtro:any){
    console.log(filtro);
  
    switch (filtro) {
    case 'todos':
      this.todos=true;
      this.noRegistrados=false;
      this.registrados=false;
        this.getPrecargados(); 
      break;
    case 'noRegistrados':
      this.todos=false;
      this.noRegistrados=true;
      this.registrados=false;
        this.filtroNoRegistrados();
      break;
    case 'registrados':
      this.todos=false;
      this.noRegistrados=false;
      this.registrados=true
      this.filtroRegistrados();
    break;
      default:
        break;
    }
   console.log(this.todos,this.noRegistrados,this.registrados);
  }

  async filtroNoRegistrados(){

  

    try{
      await this.getPrecargados(); 
    }catch(err){
      console.log(err);
    }

    let noRegister=[];
   
    let j=0;
    for (let i = 0; i < this.precargados.length; i++) {

          if(this.precargados[i].status==0){
            noRegister[j]=this.precargados[i];
            j++;
          }
    }
    this.precargados=noRegister;
    console.log(this.precargados);
  }

  async filtroRegistrados(){

  try{
      await this.getPrecargados(); 
    }catch(err){
      console.log(err);
    }

    let register=[];
   
    let j=0;
    for (let i = 0; i < this.precargados.length; i++) {

          if(this.precargados[i].status==1){
         //   console.log(this.precargados[i]);
         register[j]=this.precargados[i];
            j++;
          }
    }
    this.precargados=register;
    console.log(this.precargados);
  }

  getPrecargados(){

    return new Promise((resolve,reject)=>{
     
      this._userService.getPrecargados().subscribe(
        response=>{
          console.log(response);
          this.precargados=response.precargados; 
          resolve(response);
        },
        error=>{
          console.log(<any>error);
          reject(<any>error);
        }
      );
    });
  }
  
  eliminarPre(precargado:any){
    console.log(precargado);
    Swal.fire({
      title: 'Eliminar DNI',
      icon:'question',
      text: `¿Está seguro que desea eliminar el DNI:  ${precargado.dni}?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._userService.delePrecargados(precargado.id).subscribe(
          response=>{
            if(response.status=='success'){
              Swal.fire({
                title:'Eliminado!',
                showConfirmButton:false,
                icon:'success',
                timer:1500
              });
            }
          },
          error=>{
            console.log(<any>error);
            Swal.fire(`${error}`, '', 'error');
          }
        );
        this.getPrecargados(); 
        this.filtroNoRegistrados();
        this.filtroRegistrados();
      } 
    })
  }

}
