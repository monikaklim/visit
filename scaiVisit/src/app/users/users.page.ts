import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from './users.service';
import { Subscription } from 'rxjs';
import { LoadingController, ActionSheetController, IonItemSliding, NavController } from '@ionic/angular';
import { User } from './user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit, OnDestroy {
users:User[] = [];

private usersChangeSubcription: Subscription;
constructor(public usersService:UsersService, public loadingController: LoadingController,public actionSheetController:ActionSheetController,public navController:NavController) { }
  

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
              this.editUser();
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
            role: 'destructive',
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
this.navController.navigateRoot['/edit'+userId]
}

showUserDetails(){
console.log("details")
}

newUser(){

}

checkIn(slidingItem: IonItemSliding){
  slidingItem.close();
}


ngOnDestroy(){
 this.usersChangeSubcription.unsubscribe();
}

}
