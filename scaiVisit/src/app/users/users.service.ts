import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

constructor(public http: HttpClient) { }

private users:[] = [];

getUsers(){
  return this.users;
}



setUsers(users){
  this.users = users;
}

fetchUsers(){

}

}
