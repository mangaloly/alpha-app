import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/providers/auth.service';
import { CommonService } from 'src/app/providers/common';
import { UserService } from 'src/app/providers/user';
import {
  CalendarModal,
  CalendarModalOptions,
  DayConfig,
  CalendarResult
} from 'ion2-calendar';

@Component({
  selector: 'app-leave-request-form',
  templateUrl: './leave-request-form.component.html',
  styleUrls: ['./leave-request-form.component.scss'],
})
export class LeaveRequestFormComponent implements OnInit {

  leaveForm:any=FormGroup
  submitted:boolean=false
  date1: string;
  type1: 'string';
  date2:string;
  end_date:any;

  constructor(public formBuilder:FormBuilder,public user:UserService,private auth:AuthService,public common:CommonService,public modelCtrl:ModalController,
    public datePipe:DatePipe) { }

  ngOnInit() {
    this.leaveForm=this.formBuilder.group({
      application:['',Validators.required],
      reason:['',],
      start_date:['',Validators.required],
      end_date:['',Validators.required]
    })
  }


  get fpf(){return this.leaveForm.controls}


  applayLeave(){
    this.submitted=true
    if(this.leaveForm.valid){
      var data={
        application:this.fpf.application.value,
        reason:this.fpf.reason.value,
        start_date:this.datePipe.transform(this.fpf.start_date.value ,'yyyy-MM-dd h:mm:ss'),
        end_date:this.datePipe.transform(this.fpf.end_date.value ,'yyyy-MM-dd h:mm:ss'),
        id:this.user.profile.id,
        status:'pending'
      }

      this.auth.applyLeave(data).subscribe(resp=>{
        if(resp.success){
          this.common.presentToast("Successfully Applied Leave")
          this.modelCtrl.dismiss({
            result:true
          })
        }
      })
    }
  }


  closeModel(){
    this.modelCtrl.dismiss()
  }


}
