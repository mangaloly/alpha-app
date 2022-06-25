import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginActivate } from 'src/app/providers/loginActivate';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';

@Component({
  selector: 'app-email',
  templateUrl: './email.page.html',
  styleUrls: ['./email.page.scss'],
})
export class EmailPage implements OnInit {

  constructor(public loginActivate:LoginActivate,public modalCtrl:ModalController) { }

  ngOnInit() {
  }


  openLogin(){
  this.loginActivate.presentLogin()
  }

  async openForgotPassword(){
      const modal = await this.modalCtrl.create({
       component: ForgetPasswordComponent,
       componentProps: {
   
       } 
   });
   await modal.present();
   
   await modal.onWillDismiss().then((data) => {
      console.log(data)
   })
     
  }
}
