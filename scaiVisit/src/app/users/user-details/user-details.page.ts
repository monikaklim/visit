import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { UsersService } from '../users.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {

  constructor(public route:ActivatedRoute, public navController:NavController, public usersService:UsersService,  public loadingController:LoadingController) { }

  userId:string;
  user:User;
  isLoading:boolean = false;

    ngOnInit() {


    if(this.usersService.getUsers().length === 0){
      this.navController.navigateBack('users');
      return;
    }

    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('userId')) {
        this.navController.navigateBack('users');
        }
       else{
        this.userId = paramMap.get('userId');
        this.isLoading = true;
        this.user = this.usersService.getUser(paramMap.get('userId'));

        if(this.user){
          this.isLoading = false;
        }
       }
      });

    }

}
