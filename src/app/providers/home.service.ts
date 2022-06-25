import { Injectable } from '@angular/core';
import { Api } from './api';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(public api:Api) { }


  getNgoList(page,per_page){
    let endpoint='ngo'
    if(page > 0){
      endpoint=endpoint+'?page='+page
    }
    if(per_page > 0){
      endpoint=endpoint+'&per_page='+per_page
    }
    return this
    .api
    .get(endpoint)
  }

  getDashboard(id:any){
    let endpoint='dashboard/'+id
    return this
    .api
    .get(endpoint)
  }
}
