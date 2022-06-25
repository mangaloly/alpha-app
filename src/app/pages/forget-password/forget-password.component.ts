import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/providers/auth.service';
import { CommonService } from 'src/app/providers/common';
import { LoginActivate } from 'src/app/providers/loginActivate';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {

  is_mail:boolean=false
  email:any;

  constructor(public auth:AuthService,public common:CommonService,public loginActivate:LoginActivate,public router:Router,
    public modalCtrl:ModalController) { }

  ngOnInit() {}


  sendMail(){
    this.is_mail=true
    if(this.email){
      var data={
        email:this.email
      }
      this.auth.sendMail(data).subscribe(resp=>{
        if(resp.success){
          this.common.presentToast("Please verify your email")
          this.is_mail=false
          this.modalCtrl.dismiss()
        }
      })
    }
    }


    openLogin(){
     this.loginActivate.presentLogin()
    }

    closeModel(){
      this.modalCtrl.dismiss()
    }
}
