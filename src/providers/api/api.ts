import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'http://139.59.58.64:8080';
  protected headers: Headers;
  constructor(public http: HttpClient) {
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, token?: any) {
    // this.headers = new Headers();
    // this.headers.append('Content-Type', 'application/json')
    //   this.headers.append('Accept', 'application/json');
    let reqOpts = {
      headers: {
        'Content-Type': 'application/json'
      },
      params: new HttpParams()
    };

    if(token) {
      console.log("There is a token");
      reqOpts.headers["x-access-token"] = token;      
    } else {
      console.log("no token");
    }
    console.log("Post req initiated endppint" + endpoint)
    console.log("Post body: " + JSON.stringify(body));
    console.log("Req Opts: " + JSON.stringify(reqOpts));
    return this.http.post(this.url + '/' + endpoint, JSON.stringify(body), reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }
}
