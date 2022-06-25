import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/providers/auth.service';
import { CommonService } from 'src/app/providers/common';
import { UserService } from 'src/app/providers/user';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  loginForm: any = FormGroup
  submitted: boolean = false
  is_read: boolean = false
  is_skelton:boolean=false

  constructor(public user: UserService, public auth: AuthService, public formBuilder: FormBuilder, public common: CommonService, public menu: MenuController,
    private modalCtrl:ModalController) { }

  ngOnInit() {
    this.getProfile()
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      phone: ['', Validators.required],
      institution: [''],
      specialization: [''],
      st_img: [''],
      ngo:[''],
      dob:[''],
      blood_group:['']
    })
  }


  getProfile() {
    this.is_skelton=true
    this.auth.getProfile(this.user.profile.id).subscribe(resp => {
      if (resp.success) {
        localStorage.setItem(this.user.PROFILE, JSON.stringify(resp.data));
        this.user.profile = resp.data
        console.log(this.user.profile)
        this.is_skelton=false
        this.loginForm.get('email').patchValue(this.user.profile.email);
        this.loginForm.get('phone').patchValue(this.user.profile.phone);
        this.loginForm.get('institution').patchValue(this.user.profile.institution);
        this.loginForm.get('specialization').patchValue(this.user.profile.specialization);
        this.loginForm.get('ngo').patchValue(this.user.profile.ngo.name);
        this.loginForm.get('dob').patchValue(this.user.profile.dob);
        this.loginForm.get('blood_group').patchValue(this.user.profile.blood_group);
      }
    })
  }


  get fpf() { return this.loginForm.controls }

  update() {
    this.submitted = true
    if (this.loginForm.valid) {
      var data = {
        email: this.fpf.email.value,
        phone: this.fpf.phone.value,
        institution: this.fpf.institution.value,
        specialization: this.fpf.specialization.value,
        id: this.user.profile.id
      }
      this.auth.editProfile(data).subscribe(resp => {
        if (resp.success) {
          this.getProfile()
          this.common.presentToast("Profile Updated Successfully")
        }
      })
    }
  }

  async editProfile() {
    const modal = await this.modalCtrl.create({
      component: EditProfileComponent,
      componentProps: {

      } 
  });
  await modal.present();

  await modal.onWillDismiss().then((data) => {
    console.log(data)
     if(data.data.status){
       this.getProfile()
     }
  })
  }

  logOut() {
    this.user.logout()
  }

  getFirstname(name){
    if(name && name !=null){
    var fname=name.split(' ')
    return fname[0]
    }
  }

  openMenu() {
    this.menu.open();
  }
  
  
}
