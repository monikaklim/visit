import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {environment} from './../../environments/environment';
import * as localforage from 'localforage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private token:string = null;
private apiUrl:string = environment.apiUrl;


constructor(public http:HttpClient) { }

login(user:string, pw:string) {
  let headers = new HttpHeaders().set("Content-Type", "application/json");
  let req = { username: user, password: pw };


  return this.http.post(this.apiUrl + "signin", req, {
    observe: "response",
    headers: headers
  });
}

setToken(token:string){
  this.token = token;
}

getToken(){
return this.token;
}

logout() {
  localStorage.removeItem("token");
  localforage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localforage.removeItem("expirationDate");
  this.setToken("");
}

}
