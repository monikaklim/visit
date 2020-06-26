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

constructor(public http: HttpClient, public loadingController:LoadingController) { }

private users:User[] = [];
usersChanged = new Subject<User[]>();
getUsers(){
  return this.users;
}

getUser(userId:string){
const index = this.users.findIndex(user => user.userId === userId);
console.log(index)
console.log(this.users[index])
return this.users[index];
}

setUsers(users){
  this.users = users;
  this.usersChanged.next(this.users)
}

fetchUsers(){
return this.http.get(this.apiUrl + "usersenabled").subscribe(res => this.setUsers(res));
}


findUserFiltered(filtro) {
  return this.http.post(this.apiUrl + "usersfiltered/", filtro);
}


deleteUser(userId:string){
  this.loadingController.create({
    message: "Eliminazione in corso..."
  }).then(loadingEl => {
    loadingEl.present();
const index = this.users.findIndex(u => u.userId === userId);
 this.users.splice(index,1);
 this.http.delete(this.apiUrl + "user/" + userId).subscribe(res => {console.log(res); loadingEl.dismiss()});
 this.usersChanged.next(this.users)
  });
}


updateUser(user:User){
const index = this.users.findIndex(u => u.userId === user.userId);
 this.users.splice(index,1);
 this.users.push(user);
 this.usersChanged.next(this.users)
return this.http.put(this.apiUrl + "user/" + user.userId, user).subscribe(res => console.log(res));
}

newUser(user:User){
  this.users.push(user);
  this.usersChanged.next(this.users)
  return this.http.post(this.apiUrl + "user", user).subscribe(res => console.log(res))
}


}
