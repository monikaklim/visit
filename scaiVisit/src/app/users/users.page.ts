import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from './users.service';
import { Subscription } from 'rxjs';
import { LoadingController, ActionSheetController, IonItemSliding, NavController } from '@ionic/angular';
import { User } from './user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit, OnDestroy {
users:User[] = [{userId:"1",firstname:"test", lastname:"test",company:"test"},
{userId:"2",firstname:"test2", lastname:"test",company:"test"},
{userId:"3",firstname:"test3", lastname:"test",company:"test"},
{userId:"4",firstname:"test4", lastname:"test",company:"test"}
];

private usersChangeSubcription: Subscription;
constructor(public usersService:UsersService, public loadingController: LoadingController,public actionSheetController:ActionSheetController,public router: Router) { }
  

 ngOnInit() {
   this.usersService.fetchUsers();
    this.users =  this.usersService.getUsers();
     
    this.loadingController.create({
      message: "Caricamento visitatori..."
    }).then(loadingEl => {
      loadingEl.present();
  
      this.usersChangeSubcription = this.usersService.usersChanged.subscribe(
      (users:[])  => {
        this.users = users;
        loadingEl.dismiss(); });
      }
    );  
  }


onSelectUser(user){
  this.actionSheetController
      .create({
        buttons: [
          {
            text: 'Modifica',
            handler: () => {
              this.editUser(user.userId);
            }
          },
          {
            text: 'Dettagli',
            handler: () => {
              this.showUserDetails();
            }
          },
          {
            text: 'Elimina',
            handler: () => {
              this.deleteUser(user.userId);
            }
          },
          { text: 'Annulla', role: 'cancel' }
        ]
      })
      .then(actionSheetEl => {
        actionSheetEl.present();
      });
}

deleteUser(userId:string){
this.usersService.deleteUser(userId);
}

editUser(userId:string){
this.router.navigate(['users/edit', userId]);
console.log("edit")
}

showUserDetails(){
console.log("details")
}

newUser(){

}

checkIn(slidingItem: IonItemSliding){
  console.log("checkin")
  slidingItem.close();
}


ngOnDestroy(){
 this.usersChangeSubcription.unsubscribe();
}

}
