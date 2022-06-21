import { Component, OnInit,DoCheck } from '@angular/core';
import { faUsers,faUserGraduate,faListAlt, faClipboard,faSitemap,faHandPaper,faInfoCircle,faUsersCog, faUserCircle, faGlassCheers, faGlasses} from '@fortawesome/free-solid-svg-icons';
import { TemplateService } from '../../services/template.service';
import { Subscription } from 'rxjs';
import { UsersService } from '../../../pages/users/services/users.service';



@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit,DoCheck {
  student=faUserGraduate;
  users=faUsers;
  lista=faListAlt;
  nota=faClipboard;
  opciones=faSitemap;
  presentismo=faHandPaper;
  info=faInfoCircle;
  userIcon=faUsersCog; 
  profile=faUserCircle;
  docente=faGlasses; 
  identity:any;
  token:any;
  role: any;


  menu: boolean=true; 
  menuSubscription: Subscription | undefined; 
  pruebaSubscription: Subscription | undefined;
  activar:string='active'; 
  constructor(
    public _templateService:TemplateService,
    private _userService: UsersService,
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

  ngOnInit(): void {
  
    this.activar=''; 
    this.menuSubscription= this._templateService.menu_obs.subscribe(
      response=>{
       console.log(response);
        if(response==true){
          console.log('Mostrar el Menú');
          this.activar='active';
        }else{
          if(response==false){
            console.log('No mostrar el Menú');
            this.activar='';
          }
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

}
