import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.page.html',
  styleUrls: ['./companies.page.scss'],
})
export class CompaniesPage implements OnInit {


  @ViewChild(IonContent, {read: IonContent,static:true}) content: IonContent;
  companies:Company[] = [];
  private usersChangeSubscription: Subscription;
 
  
  
  constructor(public companiesService:CompaniesService, public loadingController: LoadingController,public actionSheetController:ActionSheetController,
    public router: Router, public alertController:AlertController, public route:ActivatedRoute) { }
  
  async loadCompanies(){

    if(filteredUsers.length === 0 ){
  
      if(this.usersService.getUsers().length === 0)
        this.usersService.fetchUsers();
       await this.loadingController.create({
        message: "Caricamento visitatori...", spinner:"bubbles", backdropDismiss:true
       }).then(loadingEl => {this.users =  this.usersService.getUsers();
          loadingEl.present(); 
          this.usersChangeSubscription = this.usersService.usersChanged.subscribe(users  => {
          this.users = users;
              });
              if(this.users.length>0)
              loadingEl.dismiss()
        });
    
    }
  
  
  }
  
  
  
  
   ngOnInit() {
  
   this.loadCompanies();
  
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
                  header:'Elimina azienda', 
                   subHeader:'Conferma eliminazione azienda',
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
  

  
  ngOnDestroy(){
  this.usersChangeSubscription.unsubscribe();
  }
  
  scrollToBottom() {
    this.content.scrollToBottom(500);
  }
  
  scrollToTop() {
    this.content.scrollToTop(500);
  }

}
