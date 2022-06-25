import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { LoginComponent } from "../pages/login/login.component";
import { CommonService } from "./common";



@Injectable({
    providedIn: 'root'
  })
  export class UserService {
      
    apiKey:any;
    hasLoggedIn:boolean=false
    profile:any=[]
    PROFILE='profile'
    APIKEY='api_key'
    HAS_LOGGED_IN='has_logged_in'



    constructor(public common:CommonService,public router:Router,public modalCtrl:ModalController){

    }


    updateLoginData(res) {
      console.log(res)
      this.profile = res.data;
      this.apiKey = res.data._token;
      this.hasLoggedIn = true;
      localStorage.setItem(this.PROFILE, JSON.stringify(this.profile));
      localStorage.setItem(this.APIKEY, this.apiKey);
      localStorage.setItem(this.HAS_LOGGED_IN, JSON.stringify(true));
    }
    updateUserData(res) {
      this.profile = res;
      localStorage.setItem(this.PROFILE, JSON.stringify(this.profile));
    }
    async logout() {
      // STORAGE 
      localStorage.removeItem(this.PROFILE);
      localStorage.removeItem(this.APIKEY);
      localStorage.removeItem(this.HAS_LOGGED_IN);
      this.profile = null;
      this.apiKey = null;
      this.hasLoggedIn = false;
      localStorage.clear()
      const modal = await this.modalCtrl.create({
        component: LoginComponent,
        componentProps: { data: { } }
    });
    await modal.present();

    await modal.onWillDismiss().then((data) => {
        console.log(data)
        if(!this.hasLoggedIn){
          navigator['app'].exitApp();
        }
    })
      this.common.presentToast("You have been successfully logged out!");
    }
    async loadUser() {
      if (localStorage.getItem(this.APIKEY)) {
        this.apiKey = localStorage.getItem(this.APIKEY);
        this.hasLoggedIn = true;
      }
        if (localStorage.getItem(this.PROFILE)) {
          this.profile = JSON.parse(localStorage.getItem(this.PROFILE));
      }
      if(localStorage.getItem(this.common.PUNCH_STATUS)){
        this.common.punch_status=localStorage.getItem(this.common.PUNCH_STATUS)
      }
      if(localStorage.getItem(this.common.PUNCH_IN_TIME)){
        this.common.punch_in_time=localStorage.getItem(this.common.PUNCH_IN_TIME)
      }
    }
  }