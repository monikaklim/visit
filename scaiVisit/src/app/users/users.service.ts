import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../environments/environment';
import { Subject } from 'rxjs';
import { User } from './user.model';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
private apiUrl:string = environment.apiUrl;

constructor(public http: HttpClient, public loadingController:LoadingController) { 

}

private users:User[] = [];
usersChanged = new Subject<User[]>();
private filteredUsers:User[] = [];
filteredUsersChanged = new Subject<User[]>();


getUsers(){
  return this.users;
}


getUser(userId:string){
  const users = this.users.slice();
  return users.find(user => user.userId == userId);
}

setUsers(users){
  this.users = users;
  this.usersChanged.next(this.users)
}

getFilteredUsers(){
  return this.filteredUsers;
}


setFilteredUsers(users){
  this.filteredUsers = users;
  this.filteredUsersChanged.next(this.filteredUsers);
}

fetchUsers(){
return this.http.get(this.apiUrl + "usersenabled").subscribe(res => this.setUsers(res));
}


findUserFiltered(filtro) {
 
  return this.http.post<User[]>(this.apiUrl + "usersfiltered/", filtro).subscribe(res=> 
    this.setFilteredUsers(res) );
}




deleteUser(userId:string){
  this.loadingController.create({
    message: "Eliminazione in corso..."
  }).then(loadingEl => {
    loadingEl.present();
  const index = this.users.findIndex(u => u.userId === userId);
  this.users.splice(index,1);
  this.http.delete(this.apiUrl + "user/" + userId).subscribe(res => { loadingEl.dismiss()});
  this.usersChanged.next(this.users);
  });
}


updateUser(user:User){
  const users = this.users.slice();
  const index = users.findIndex(u => u.userId == user.userId);
  users.splice(index,1);
  users.push(user);
  this.setUsers(users);

  this.http.put(this.apiUrl + "user/" + user.userId, user).subscribe(res => console.log(res) );

}

newUser(user:User){
  this.users.push(user);
  this.usersChanged.next(this.users);
  return this.http.post(this.apiUrl + "user", user).subscribe(res => console.log(res));
}


}
