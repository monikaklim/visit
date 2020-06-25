import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from './users.service';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit,OnDestroy {
users = [];

private usersChangeSubcription: Subscription;
constructor(public usersService:UsersService, public loadingController: LoadingController) { }

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
  

ngOnDestroy(){
 this.usersChangeSubcription.unsubscribe();
}

}
