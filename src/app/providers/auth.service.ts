import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from './api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public api:Api,public http:HttpClient) { }

  userLogin(data){
  let endpoint='login'
  return this
  .api
  .post(endpoint,data)
  }

  getProfile(id){
    let endpoint='profile/'+id
    return this
    .api
    .get(endpoint)
  }

  editProfile(data){
    let endpoint='profile/edit/'+data.id
    return this
    .api
    .post(endpoint,data)
  }

  getAttendence(id){
    let endpoint='punch/detail/'+id
    return this
    .api
    .get(endpoint)
  }

  applyLeave(data){
    let endpoint='leave-request/'+data.id
    return this
    .api
    .post(endpoint,data)
  }

  getLeaveList(id){
   let endpoint='leave-list/'+id
   return this
   .api
   .get(endpoint)
  }

  sendMail(data){
    let endpoint='send-mail'
    return this
    .api
    .post(endpoint,data)
  }
}
