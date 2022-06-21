import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-pre-cargar',
  templateUrl: './pre-cargar.component.html',
  styleUrls: ['./pre-cargar.component.css']
})
export class PreCargarComponent implements OnInit {
 
  roles:any; 
  private isDni:string='[0-9]+';

  preCargaForm=this.fb.group({
    dni: ['',[Validators.required,Validators.minLength(7),Validators.pattern(this.isDni)]],
    role:['',[Validators.required]]
    });
 
  constructor(
    private fb:FormBuilder,
    private _userService: UsersService
  ) { }

  ngOnInit(): void {
    this.getRoles();
    console.log('PRE CARGAR');
  }
  
  isValidField(name:string):boolean{
    const fieldName:any=this.preCargaForm.get(name);
    return fieldName?.invalid && fieldName?.touched;
  }

  getRoles(){
    console.log('roles ');
    this._userService.getRoles().subscribe(
      (response:any)=>{
        this.roles=response.roles; 
        console.log(response);
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  onSubmit(){ 
    console.log(this.preCargaForm.value);
    Swal.fire({
      title:'Pre-Cargar Usuario',
      icon:'question',
      text:`¿Ingresar DNI: ${this.preCargaForm.value.dni} ?`,
      showConfirmButton:true,
      showCancelButton:true
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._userService.precargar(this.preCargaForm.value).subscribe(
          response=>{
            console.log(response);
            if(response.status=='success'){
              Swal.fire({
                title:'Pre-Cargar Usuario',
                text:`Usuario Pre-cargado`,
                icon:'success',
                showConfirmButton:false,
                timer:1500
              });
            }
            if(response.status=='repetido'){
              Swal.fire({
                title:'Pre-Cargar Usuario',
                text:`El DNI ya se cargó con anterioridad`,
                icon:'info',
                showConfirmButton:true
              });
            }
          },
          error=>{
            console.log(<any>error);
            Swal.fire({
              title:'Pre-Cargar Usuario',
              text:`${<any>error.message}`,
              icon:'error',
              showConfirmButton:false,
              timer:1500
            })
          }
        );
        this._userService.preCargado.emit(true);
      } 
     });
  }
  
  
}
