import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { CommonService } from './providers/common';
import { LoginActivate } from './providers/loginActivate';
import { UserService } from './providers/user';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild('splash',{static:false})splash:ElementRef
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  is_splash:boolean=false
  constructor(public user:UserService,public platform:Platform,public common:CommonService,public lg:LoginActivate,public router:Router) {
    this.user.loadUser()
    this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.backButtonEvent()
      setTimeout(()=>{
        this.is_splash=true
        this.splash.nativeElement.style.display='none'
      },3000)
    });

  }

  logOut(){
    if(this.common.punch_status !='punchin'){
      this.user.logout()
    }else{
      this.common.presentToast("Please Punch out before logout")
    }

  }

  getFirstname(name){
    if(name && name !=null){
    var fname=name.split(' ')
    return fname[0]
    }
  }

  backButtonEvent() {

    var appexit=0
    this.platform.backButton.subscribeWithPriority(0, () => {
      console.log(this.router.url)
      if(this.router.url == '/tabs/home'){
        appexit = appexit +1
        this.common.presentToast('Press again to exit');
        console.log(appexit)
        if(appexit == 2){
          navigator['app'].exitApp();
        }
      }
      this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
        console.log( window.history)
        window.history.back()
      });
    });


  }
}
