import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { CalendarModal, CalendarModalOptions, DayConfig, CalendarResult, CalendarComponentOptions } from "ion2-calendar";
import * as moment from 'moment';
import { AuthService } from 'src/app/providers/auth.service';
import { UserService } from 'src/app/providers/user';
import { LeaveRequestFormComponent } from '../leave-request-form/leave-request-form.component';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {

  attendence_details:any=[]
  active_tab:any='Attendance'
  leave_list:any=[]
  dateMulti: string[];
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi'
  };
  is_skelton:boolean=false
  monthlist:any=[]
  leaves:any=[]

  constructor(public auth:AuthService,public user:UserService, public menu: MenuController,private modalCtrl:ModalController,
    public datePipe:DatePipe) { }

  ngOnInit() {
    this.getAttendanceDetails()
  }

  getAttendanceDetails(){
    this.is_skelton=true
  this.auth.getAttendence(this.user.profile.id).subscribe(resp=>{
    if(resp.success){
      console.log(resp)
      this.is_skelton=false
      this.attendence_details=resp.data
    }
  })
  }

  getTab(event){
    console.log(event.detail.value)
    this.active_tab=event.detail.value
    if(this.active_tab == 'Leave'){
      this.getLeaves()
    }
    if(this.active_tab == 'Attendance'){
      this.getAttendanceDetails()
    }
  }

  openMenu() {
    this.menu.open();
  }


  async applayLeave(){
    const modal = await this.modalCtrl.create({
      component: LeaveRequestFormComponent,
      componentProps: {

      } 
  });
  await modal.present();

  await modal.onWillDismiss().then((data) => {
     if(data.data.result){
      this.active_tab ='Leave'
       this.getLeaves()
     }
  })
  }

  getLeaves(){
    this.is_skelton=true
    this.auth.getLeaveList(this.user.profile.id).subscribe(resp=>{
      if(resp.success){
        this.is_skelton=false
        this.leave_list=resp.data 

        this.leaves = this.leave_list.reduce((r, a) => {
          r[this.datePipe.transform(a.start_date , 'MMMM')] = [...r[this.datePipe.transform(a.start_date , 'MMMM')] || [], a];
          return r;
         }, {});
         console.log("group", this.leaves);
        
      }
    })
  }

  getLeaveType(data){

  }


  getClass(time,ap){
    if(time < '9:00' && ap =='AM'){
      return 'green'
    }else{
      return 'red'
    }
  }

  getPunchOut(time){
    var format = 'hh:mm:ss a'

    // var time = moment() gives you current time. no format required.
    var actual = moment(time,format),
      beforeTime = moment('09:00:00 AM', format),
      afterTime = moment('5:00:00 PM', format);
    
    if (actual.isBetween(beforeTime, afterTime)) {
    
      return 'yellow'
    
    } 
    
  }

  getstatusClass(status){
   var stat_class:any;
    if(status == 'pending'){
      stat_class ='awaiting'
    }else if(status == 'accepted'){
      stat_class ='approved'
    }else{
      stat_class = 'declined'
    }

    return stat_class
  }


  diff_minutes(dt2, dt1)
 {
   dt2=new Date(dt2)
   dt1=new Date(dt1)
   if(!dt1){
     dt1=Date()
   }
  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
 }


}
