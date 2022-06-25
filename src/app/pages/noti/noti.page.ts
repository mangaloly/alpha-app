import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NotificationService } from 'src/app/providers/notification.service';
import { UserService } from 'src/app/providers/user';

@Component({
  selector: 'app-noti',
  templateUrl: './noti.page.html',
  styleUrls: ['./noti.page.scss'],
})
export class NotiPage implements OnInit {

  notification_list:any=[]

  constructor( public menu: MenuController,public notification:NotificationService,public user:UserService) { }

  ngOnInit() {
    this.getNotificationList()
  }

  openMenu() {
    this.menu.open();
  }


  getNotificationList(){
    this.notification.getNotificationList(this.user.profile.id).subscribe(resp=>{
      if(resp.success){
         this.notification_list=resp.data
      }
    })
  }


  openNotification(not){
    if(not.read_by == 'N'){
      var data={
        id:not.id
      }
      this.notification.openNotification(data).subscribe(resp=>{
        if(resp.success){
          let index=this.notification_list.findIndex(x=> x.id == not.id)
          this.notification_list[index].read_by=""
        }
      })
    }
  }

}
