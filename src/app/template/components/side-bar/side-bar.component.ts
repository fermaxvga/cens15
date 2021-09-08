import { Component, OnInit } from '@angular/core';
import { faUsers,faUserGraduate,faListAlt, faClipboard,faSitemap,faHandPaper,faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import { TemplateService } from '../../services/template.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  student=faUserGraduate;
  users=faUsers;
  lista=faListAlt;
  nota=faClipboard;
  opciones=faSitemap;
  presentismo=faHandPaper;
  info=faInfoCircle;

  menu: boolean=true; 
  menuSubscription: Subscription | undefined; 
  pruebaSubscription: Subscription | undefined;
  activar:string='active'; 
  constructor(
    public _templateService:TemplateService
  ) { }

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

}
