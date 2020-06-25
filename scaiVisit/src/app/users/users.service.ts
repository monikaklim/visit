import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../environments/environment';
import { Subject } from 'rxjs';
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
private apiUrl:string = environment.apiUrl;

constructor(public http: HttpClient) { }

private users:User[] = [];
usersChanged = new Subject<User[]>();
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

deleteUser(userId:string){
  const index = this.users.findIndex(u => u.userId === userId);
  this.users.splice(index,1);
  this.usersChanged.next(this.users)
  return this.http.delete(this.apiUrl + "user/" + userId);
}


updateUser(){

}

newUser(){

}


}
