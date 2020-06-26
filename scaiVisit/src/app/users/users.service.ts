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
const user = this.users.filter(user => user.userId === userId);
console.log(user[0].userId)
return user;
}

setUsers(users){
  this.users = users;
  this.usersChanged.next(this.users)
}

fetchUsers(){
return this.http.get(this.apiUrl + "usersenabled").subscribe(res => this.setUsers(res));
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
 console.log("delete service")
  });
}


updateUser(){
console.log("edit service")
}

newUser(){

}


}
