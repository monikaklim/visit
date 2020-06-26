import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from './users.service';
import { Subscription } from 'rxjs';
import { LoadingController, ActionSheetController, IonItemSliding, NavController, AlertController } from '@ionic/angular';
import { User } from './user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit, OnDestroy {
users:User[] = [];

private usersChangeSubcription: Subscription;
constructor(public usersService:UsersService, public loadingController: LoadingController,public actionSheetController:ActionSheetController,public router: Router, public alertController:AlertController) { }
  

 ngOnInit() {
   if(this.usersService.getUsers().length === 0)
   this.usersService.fetchUsers();

   
     
    this.loadingController.create({
      message: "Caricamento visitatori..."
    }).then(loadingEl => {
      loadingEl.present();
      this.users =  this.usersService.getUsers();
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
              
              this.alertController.create({
                header:'Elimina visitatore', 
                 subHeader:'Conferma eliminazione visitatore',
                 buttons:[ {
                  text: 'Annulla',
                  role: 'cancel'
                },  
                  {
                  text: 'Elimina',
                  handler: () => {
                    this.deleteUser(user.userId);
                  }
                }]
               }).then(alertEl => {
                 alertEl.present();
          
               });
              
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
  this.router.navigate(['users/new']);
}

checkIn(slidingItem: IonItemSliding){
  console.log("checkin")
  slidingItem.close();
}


ngOnDestroy(){
 this.usersChangeSubcription.unsubscribe();
}

}
