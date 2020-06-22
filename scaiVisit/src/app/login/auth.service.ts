import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {environment} from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private token:string = null;
private apiUrl:string = environment.apiUrl;


constructor(public http:HttpClient) { }

login(user, pw) {
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



/*
login() {
  let headers = new HttpHeaders().set("Content-Type", "application/json");
  let req = { username: this.username, password: this.password };
  
  return this.http.post(this.apiUrl + "token", req, {
    observe: "response",
    headers: headers
  });
}



verifytoken() {
  let headers = new HttpHeaders().set(
    "Authorization",
    "Bearer " + this.token
  );
  return this.http.get(this.apiUrl + "verifytoken", {
    observe: "response",
    headers: headers
  });
}
*/

}
