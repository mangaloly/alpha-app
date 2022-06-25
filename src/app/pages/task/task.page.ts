import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/providers/common';
import { TaskService } from 'src/app/providers/task.service';
import { UserService } from 'src/app/providers/user';
import * as moment from 'moment';
import { CalendarModal, CalendarModalOptions, CalendarResult } from 'ion2-calendar';



@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild('dateTime') sTime;

  page:any=1
  per_page=12
  loadingTask:boolean=false
  totalPages:any=0
  hasLoadMore:boolean=false
  task_list:any=[]
  active_date:any;
  today_date:any=Date()
  date_array:any=[]
  endDate:any;
  today_task_count:any;
  current_date:any=Date()
  maxDate:any;
  is_date:boolean=false
  minDate:any;
  date: string;
  type: 'string';
  

  

  constructor(public task:TaskService,public user:UserService,public datePipe:DatePipe,public common:CommonService,public modelCtrl:ModalController) { }

  ngOnInit() {
    this.getTasks()
    this.active_date= this.datePipe.transform( new Date() ,'yyyy-MM-dd');
    this.endDate= new Date(new Date().setDate(new Date().getDate() - 7));
     console.log(this.endDate)

      for (var i=0; i<7; i++) {
          var d = new Date();
          d.setDate(d.getDate() - i);
          console.log(d)
          this.date_array.push(this.datePipe.transform(d ,'yyyy-MM-dd') )
      }
      this.maxDate =moment(Date()).format('yyyy-MM-DD')
      this.minDate =moment(Date()).subtract(1, "year").format('yyyy-MM-DD')

  }





  getTasks(event:any=null) {
    if(this.page == 1){
      this.loadingTask=true;
    }
    this.task.getTasks(this.page,this.per_page,this.user.profile.id,this.datePipe.transform(this.active_date,'yyyy-MM-dd')).subscribe(res => {
      if (res.success == true) {
        this.totalPages = Math.ceil(res.data.task.total / res.data.task.per_page);
        this.hasLoadMore = this.page < this.totalPages;
        this.today_task_count=res.data.task.total
         this.task_list=this.task_list.concat(res.data.task)
         if(this.task_list && this.task_list.length > 0){
           this.task_list.forEach(element => {
             if(element.status == 'Active' || element.status == null){
               element.check_status =false
             }else{
              element.check_status =true
             }
           });
         }
         console.log(this.task_list)
         this.loadingTask=false;

        if (this.hasLoadMore) {``
          this.page++;
          if (this.infiniteScroll)
            this.infiniteScroll.complete();
        } else {
          // if (this.infiniteScroll) {

            this.infiniteScroll.complete();
            this.infiniteScroll.disabled = true;
          // }
        }
      }
      this.loadingTask=false;
    }, err => {
      this.loadingTask=false;
      console.error('ERROR', err);
      // this.common.processError(err);
      return false;
    });
  }




  taskCompeleted(event){
    if(this.common.punch_status =='punchin'){
    var data={
      active:event.detail.checked ? 'completed' : 'active',
      id:event.detail.value
    }
    this.task.updateTask(data).subscribe(resp=>{
      if(resp.success){
        let index=this.task_list.findIndex(x=>x.checklist_id == event.detail.value)
        this.task_list[index].status=event.detail.checked ? 'completed' :'active'
        let that=this
        setTimeout(()=>{
          that.task_list[index].check_status = event.detail.checked ? true :false
        },100)
        // this.common.presentToast(event.detail.checked ? 'Task Completed' :'Task is active')
        var task_count:any;
        this.task_list.forEach(element => {
          if(element.status == 'active'){
            return
          }else{
            task_count=task_count+1
          }
        });

        if(task_count == this.task_list.length){
          this.common.presentToast("Today's task has been completed")
        }
      }
    },error=>{
      this.page=1
      this.task_list=[]
      this.getTasks()
    })
  }else{
    this.common.presentToast("Please Punch IN First")
    let that=this
    setTimeout(()=>{
      let index=that.task_list.findIndex(x=>x.checklist_id == event.detail.value)
      that.task_list[index].check_status = false
    },100)
    return;
  }
  }

  openDateTimePicker(){
    this.is_date=!this.is_date
  }

  openCheck(task){
    if(this.common.punch_status =='punchin'){
    console.log(task)
    if(task.status == "completed"){
      task.status='active'
    }else{
      task.status='completed'
    }
    console.log(task)
  }else{
    this.common.presentToast("Please Punch IN First")
    return;
  }
  }

  onChange(event) {
    console.log(event)
    this.active_date=event._d
    this.task_list=[]
    this.page=1
    this.getTasks()
    this.is_date=false
  }

  // async openCalendar() {
  //   const options: CalendarModalOptions = {
  //     title: 'BASIC',
  //   };
 
  //   const myCalendar = await this.modelCtrl.create({
  //     component: CalendarModal,
  //     componentProps: { options }
  //   });
 
  //   myCalendar.present();
 
  //   const event: any = await myCalendar.onDidDismiss();
  //   const date: CalendarResult = event.data;
  //   if(date.dateObj){
      

  //   }
  // }

filterDate(event){
  console.log(event)
  this.active_date=this.datePipe.transform(event ,'yyyy-MM-dd')
  this.task_list=[]
  this.page=1
  this.getTasks()
  this.is_date=false
}


doRefresh(event){
  this.page=1
  this.task_list=[]
  this.getTasks()
  if(event){
    event.target.complete()
  }
}
}



