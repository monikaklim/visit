import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UsersService } from './users.service';
import { Subscription } from 'rxjs';
import { LoadingController, ActionSheetController, IonItemSliding, NavController, AlertController, IonContent, ModalController } from '@ionic/angular';
import { User } from './user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CompaniesService } from '../companies/companies.service';
import { Company } from './../companies/company.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit, OnDestroy {
@ViewChild(IonContent, {read: IonContent,static:true}) content: IonContent;
users:User[] = [];
companies:Company[]=[];
private usersChangeSubscription: Subscription;
private filteredUsersChangeSubscription: Subscription;
private companiesChangedSubscription: Subscription;
isFiltered = false;


constructor(public usersService:UsersService, public loadingController: LoadingController,public actionSheetController:ActionSheetController,public companiesService:CompaniesService,
  public router: Router, public alertController:AlertController, public route:ActivatedRoute, public modalController: ModalController) { }

async loadUsers(){
let filteredUsers = this.usersService.getFilteredUsers();
  if(filteredUsers.length === 0 ){

    if(this.usersService.getUsers().length === 0)
      this.usersService.fetchUsers();
     await this.loadingController.create({
      message: "Caricamento visitatori...", spinner:"bubbles", backdropDismiss:true
     }).then(loadingEl => {this.users =  this.usersService.getUsers();
        loadingEl.present(); 
        this.usersChangeSubscription = this.usersService.usersChanged.subscribe(users  => {
        this.users = users;  
         loadingEl.dismiss()
            });
      });
  }
}



 ngOnInit() {

  if(this.users.length == 0)
 this.loadUsers();

 this.companiesService.fetchCompanies();
 this.companies = this.companiesService.getCompanies();
 this.companiesChangedSubscription =  this.companiesService.companiesChanged.subscribe(companies => {
   this.companies = companies
 })

 this.filteredUsersChangeSubscription = this.usersService.filteredUsersChanged.subscribe(users  => {
  this.users = users;
  if(users.length > 0 && users)
  this.isFiltered = true;
     
 });

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
              this.showUserDetails(user.userId);
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

showUserDetails(userId:string){
  this.router.navigate(['users/details/',userId]);
}

cancelFilter(){
this.isFiltered = false;
this.usersService.setFilteredUsers([]);
this.loadUsers();
}



 async showAlert(user:User,slidingItem:IonItemSliding){
  const userId = user.userId;
  slidingItem.close();
  let inputs = [];
  for(let company of this.companies){
    inputs.push({name:company.name, type:'radio', label: company.name, value:company});
  }


  const alert = await this.alertController.create({
   
    header: 'Seleziona Azienda',
    inputs: inputs,
    buttons: [
      {
        text: 'Annulla',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, 
      {
        text: 'Conferma',
        handler: (alertData) => {
          if(alertData)
        this.checkIn(userId, alertData)
        }
      }
    ]
  });

  await alert.present();

}


checkIn(userId:string,company:Company){
 this.router.navigateByUrl('registrations/signature?userId='+userId+'&companyId='+company.companyId+'&type=1');
}




ngOnDestroy(){
this.usersChangeSubscription.unsubscribe();
this.filteredUsersChangeSubscription.unsubscribe();
}

scrollToBottom() {
  this.content.scrollToBottom(500);
}

scrollToTop() {
  this.content.scrollToTop(500);
}

}
