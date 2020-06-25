import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
private apiUrl:string = environment.apiUrl;

constructor(public http: HttpClient) { }

private users:[] = [];
usersChanged = new Subject<[]>();
getUsers(){
  return this.users;
}



setUsers(users){
  this.users = users;
  this.usersChanged.next(this.users)
}

fetchUsers(){
return this.http.get(this.apiUrl + "usersenabled").subscribe(res => this.setUsers(res));
}

}
