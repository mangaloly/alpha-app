import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/providers/auth.service';
import { CommonService } from 'src/app/providers/common';
import { UserService } from 'src/app/providers/user';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm:any=FormGroup
  submitted:boolean=false
  show: boolean = false;
  is_forget:boolean=false
  email:any;
  is_mail:boolean=false
  is_loader:boolean=false

  constructor(public formBuilder:FormBuilder,public auth:AuthService,public common:CommonService,public user:UserService,
    public modalCtrl:ModalController,public loadingController:LoadingController,public router:Router) { }

  ngOnInit() {
   this.loginForm=this.formBuilder.group({
     username:['',Validators.required],
     password:['',Validators.required]
   })
  }


  get fpf(){return this.loginForm.controls}

  async loginUser(){
    this.submitted=true
    if(this.loginForm.valid){
      this.is_loader=true
      var data={
        username:this.fpf.username.value,
        password:this.fpf.password.value
      }
     this.auth.userLogin(data).subscribe(resp=>{
       console.log(resp.success)
       if(resp.success){
        this.is_loader=false
        this.processSuccessLogin(resp);
        this.common.presentToast(resp.message)
       }else{
        this.common.presentToast("Invalid Username or Password"); 
        this.is_loader=false
       }
     },error=>{
      this.is_loader=false
     })
    }
  }


  processSuccessLogin(res){
    console.log(res);
    this.user.hasLoggedIn = true
    this.user.updateLoginData(res);
    // this.events.publishSomeData(this.common.USER_LOGIN);
    this.loginForm.reset();
    this.dismiss(true)
  }

  async dismiss(loginSuccess: boolean = false) {
    this.modalCtrl.dismiss({
      'loginSuccess': loginSuccess
    });
  }

  password() {
    this.show = !this.show;
  }

  async forgetPwd(){
    this.modalCtrl.dismiss()
   const modal = await this.modalCtrl.create({
    component: ForgetPasswordComponent,
    componentProps: {

    } 
});
await modal.present();
await modal.onWillDismiss().then((data) => {
  console.log("workinggggggggg")
  this.router.navigate(['/email'])
})
  }



}