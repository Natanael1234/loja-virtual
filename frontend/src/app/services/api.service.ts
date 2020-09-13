import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:3003/';
  constructor(public http: HttpClient) {}

  get (segment:string, params?:any) {
    let queryParams = Object.keys(params || {}).map(key => key + '=' + params[key]).join('&');
    return this.http.get(this.baseUrl + segment + (queryParams ? '?' + queryParams : '')).toPromise();
  }

  post (segment:string, params?:any) {
    return this.http.post(this.baseUrl + segment, params || {}).toPromise();
  }

  delete (segment:string, params?:any) : Promise<any> {
    let queryParams = Object.keys(params || {}).map(key => key + '=' + params[key]).join('&');
    return this.http.delete(this.baseUrl + segment).toPromise();
  }
}
