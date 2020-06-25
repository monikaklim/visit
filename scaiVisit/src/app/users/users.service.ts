import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
private apiUrl:string = environment.apiUrl;

constructor(public http: HttpClient) { }

private users:[] = [];

getUsers(){
  return this.users;
}



setUsers(users){
  this.users = users;
}

fetchUsers(){
return this.http.get(this.apiUrl + "usersenabled", {
    observe: "response"
  }).subscribe(users => {this.setUsers(users);});


}

}
