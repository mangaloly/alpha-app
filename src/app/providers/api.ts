import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { CommonProvider } from './common';
import { Observable } from 'rxjs';
import { UserService } from './user';


/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable({ providedIn: 'root' })

export class Api {
  loginType: any
  url:any;



  constructor(public http: HttpClient, public user: UserService,
) {
      this.url='https://admin.alphachaperone.com/api/v3'
    
  }

  get(endpoint: string, params?: any): Observable<any>{

    let options: any = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.user.apiKey,
        
      },responseType: 'json' 
    }
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      options.search = params;
    }

    return this
      .http
      .get(this.url + '/' + endpoint, options);
  }



  post(endpoint: string, body: any): Observable<any> {
    let options: any = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.user.apiKey
      }
    }

    console.log(this.url,endpoint)

    return this
      .http
      .post(this.url + '/' + endpoint, body, options);
  }
  postAsJson(endpoint: string, body: any): Observable<any> {
    let options: any = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.user.apiKey
      }
    }
    return this
      .http
      .post(this.url + '/' + endpoint, body, options);
  }
  postAsFormData(endpoint: string, body: any): Observable<any> {
    let options: any = {
      headers: {
        'Authorization': 'Bearer ' + this.user.apiKey
      }
    }

    return this
      .http
      .post(this.url + '/' + endpoint, body, options);
  }
  put(endpoint: string, body: any) : Observable<any>{
    let options: any = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.user.apiKey
      }
    }
    return this
      .http
      .put(this.url + '/' + endpoint, body, options);
  }


  delete(endpoint: string): Observable<any> {
    let options: any = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.user.apiKey
      }
    }
    return this
      .http
      .delete(this.url + '/' + endpoint, options);
  }

  patch(endpoint: string, body: any) : Observable<any>{
    let options: any = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.user.apiKey
      }
    }
    return this
      .http
      .patch(this.url + '/' + endpoint, body, options);
  }






  callPrivatApi(endpoint: string, params?: any): Observable<any> {
    let options: any = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.user.apiKey
      }
    }
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      options.search = params;
    }

    return this
      .http
      .get(endpoint, options);
  }
  callPrivatApiPost(endpoint: string, body?: any): Observable<any> {
    let options: any = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.user.apiKey
      }
    }

    return this
      .http
      .post(endpoint, body, options);
  }
}
