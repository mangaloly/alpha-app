import { Injectable } from '@angular/core';
import { Api } from './api';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(public api:Api) { }

  getTasks(page,per_page,id:any,date:any=null){
    let endpoint='task/intern/'+id
    if(page > 0){
      endpoint=endpoint+'?page='+page
    }
    if(per_page > 0){
      endpoint=endpoint+'&per_page='+per_page
    }
    if(date !=null){
      endpoint=endpoint+'&date='+date
    }
    return this
    .api
    .get(endpoint)
  }

  updateTask(data){
    let endpoint='task/'+data.id
    return this
    .api
    .post(endpoint,data)
  }
}
