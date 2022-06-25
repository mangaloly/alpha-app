import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/providers/auth.service';
import { CommonService } from 'src/app/providers/common';
import { UserService } from 'src/app/providers/user';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Api } from 'src/app/providers/api';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {

  loginForm:any=FormGroup
  submitted:boolean=false
  filePath: string;

  constructor(public formBuilder:FormBuilder,public user:UserService,public common:CommonService,public auth:AuthService,public modelCtrl:ModalController,
    public camera:Camera,public api:Api,public transfer:FileTransfer) { }

  ngOnInit() {
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

    this.loginForm.get('email').patchValue(this.user.profile.email);
    this.loginForm.get('phone').patchValue(this.user.profile.phone);
    this.loginForm.get('institution').patchValue(this.user.profile.institution);
    this.loginForm.get('specialization').patchValue(this.user.profile.specialization);
    this.loginForm.get('st_img').patchValue(this.user.profile.st_img);
    this.loginForm.get('ngo').patchValue(this.user.profile.ngo.name);
    this.loginForm.get('dob').patchValue(this.user.profile.dob);
    this.loginForm.get('blood_group').patchValue(this.user.profile.blood_group);
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
        id: this.user.profile.id,
        ngo:this.fpf.ngo.value,
        dob:this.fpf.dob.value,
        blood_group:this.fpf.blood_group.value,
      }
      this.auth.editProfile(data).subscribe(resp => {
        if (resp.success) {
          this.common.presentToast("Profile Updated Successfully")
          this.modelCtrl.dismiss({status:true})
        }
      })
    }
  }

  openCamera() {
    const options: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: 1,
      // targetWidth: 350,
      // targetHeight: 350,
      allowEdit: false
    }
    this.camera.getPicture(options).then((imageData) => {
      this.uploadImage(imageData)
    }, (err) => {
      // Handle error
      console.log(err)
    });
  }

  uploadImage(image) {
    var url = this.api.url + '/profile/edit/' + this.user.profile.id;
    this.filePath = image
    let options: FileUploadOptions = {
      fileKey: 'in_img',
      fileName: image,
      params: {},
      headers: {
        'x-api-key': this.user.apiKey
      },
      mimeType: "image/jpeg",
      chunkedMode: false,
      httpMethod: "POST",
    }

    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.onProgress((progressEvent: ProgressEvent) => {
      console.log(progressEvent);
    })

    // this.common.presentToast('Uploading...');

    fileTransfer.upload('file://' + this.filePath, url, options).then((data) => {
      console.log(data)
      let result: any = {};
      try {
        result = JSON.parse(data.response);
        console.log(result)
        localStorage.setItem(this.user.PROFILE, JSON.stringify(result.data));
        this.user.profile = result.data
      } catch (err) {
        console.log(data.response);
        console.log(err);
      }
      if (result.data) {

        // this.common.presentToast('Successfully uploaded');
      } else {

      }
      // this.common.hideIonicLoader();
    }, (err) => {
      console.log(err);

      // this.common.hideIonicLoader();
    })

  }


  closeModel(){
    this.modelCtrl.dismiss({status:false})
  }
  
}
