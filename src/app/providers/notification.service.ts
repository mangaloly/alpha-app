import { Injectable } from '@angular/core';
import { Api } from './api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public api:Api) { }


  getNotificationList(id){
    let endpoint='profile/notification/'+id
    return this
    .api
    .get(endpoint)
  }

  openNotification(data){
    let endpoint='profile/notification/read/'+data.id
    return this
    .api
    .post(endpoint,data)
  }
}
