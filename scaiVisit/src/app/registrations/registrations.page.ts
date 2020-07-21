import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, LoadingController, AlertController,IonSlides } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UsersService } from '../users/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Registration } from './registration.model';
import { CompaniesService } from './../companies/companies.service';
import { RegistrationsService } from './registrations.service';
import { SharedService } from './../shared/shared.service';
import { PdfService } from './pdf/pdf.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.page.html',
  styleUrls: ['./registrations.page.scss'],
})
export class RegistrationsPage implements OnInit {
  @ViewChild(IonContent, {read: IonContent,static:true}) content: IonContent;
  @ViewChild(IonSlides, {static:true}) slides: IonSlides;
  registrations:Array<any> =  [];
  private registrationsChangeSubscription: Subscription;
  private responseChangeSubscription: Subscription;
  private countChangeSubscription: Subscription;
  private countvisitChangeSubscription: Subscription;
  response:any = {};
  count:any = {};
  countvisit: any = {};
  date:Date = new Date();
  slidesOptions = {autoHeight:true, speed:300};
  needsToLoad = true;

  constructor(public usersService:UsersService,public companiesService:CompaniesService, public registrationsService:RegistrationsService,public sharedService:SharedService, public loadingController: LoadingController,
    public router: Router, public alertController:AlertController, public route:ActivatedRoute, public pdfService:PdfService) { 

    }
  
async loadRegistrations(){
  await this.loadingController.create({
    message: "Caricamento registrazioni...", spinner:"bubbles", backdropDismiss:true
   }).then(loadingEl => {
    this.registrations = this.registrationsService.getRegistrations();  
      loadingEl.present(); 
    
      this.registrationsChangeSubscription = this.registrationsService.registrationsChanged.subscribe(registrations  => {
        this.registrations = registrations;
    });      

      this.responseChangeSubscription = this.registrationsService.responseChanged.subscribe(res  => {
        this.response = res; 
       });   

       loadingEl.dismiss();
}).catch(loadingEl => loadingEl.dismiss());
}


    async loadRegistrationsToday(){
    
           await this.loadingController.create({
            message: "Caricamento registrazioni...", spinner:"bubbles", backdropDismiss:true
           }).then(loadingEl => {
            this.registrationsService.findRegistrazioniToday("Torino"); 
            
              loadingEl.present(); 
            
              this.registrationsChangeSubscription = this.registrationsService.registrationsChanged.subscribe(registrations  => {
                this.registrations = registrations;
        
               loadingEl.dismiss();

            });      

              this.responseChangeSubscription = this.registrationsService.responseChanged.subscribe(res  => {
                this.response = res; 
               });   
    });

 }
      

  ngOnInit() {
    if(this.needsToLoad ){
       this.loadRegistrations();
       this.needsToLoad = false;
    }
    this.registrationsChangeSubscription = this.registrationsService.registrationsChanged.subscribe(registrations  => {
      this.registrations = registrations;
    });
    
    this.countChangeSubscription = this.registrationsService.countChanged.subscribe(count  => {
     this.count = count; 
    });
   
     this.countvisitChangeSubscription = this.registrationsService.countvisitChanged.subscribe(countvisit  => {
     this.countvisit = countvisit; 
    });
    
    this.responseChangeSubscription = this.registrationsService.responseChanged.subscribe(res  => {
      this.response = res; 
     }); 
  }

 checkOut(firstName:string,lastName:string,idRegistration){
  
 this.alertController.create({
    header:"Conferma uscita",
    subHeader: 'Confermi l\'uscita di '+ firstName + ' '+ lastName + "?",
    
    buttons: [
      {
        text: 'Annulla',
        role: 'cancel',
        cssClass: 'secondary'
      }, 
      {
        text: 'Conferma',
        handler: () => { this.router.navigateByUrl('registrations/signature?registrationId='+idRegistration+'&type=2');
        }
      }
    ]
  }).then(alertEl => alertEl.present());

}

  scrollToBottom() {
    this.content.scrollToBottom(500);
  }
  
  scrollToTop() {
    this.content.scrollToTop(500);
  }
  



  onCreatePdf(){
    this.pdfService.makePdfFirme(this.registrations);
  }

}
