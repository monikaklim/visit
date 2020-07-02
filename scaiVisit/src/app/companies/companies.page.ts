import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ActionSheetController, AlertController } from '@ionic/angular';
import { Company } from './company.model';
import { Subscription } from 'rxjs';
import { CompaniesService } from './companies.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.page.html',
  styleUrls: ['./companies.page.scss'],
})
export class CompaniesPage implements OnInit {

  companies:Company[] = [];
  private companiesChangeSubscription: Subscription;
 
  
  
  constructor(public companiesService:CompaniesService, public loadingController: LoadingController,public actionSheetController:ActionSheetController,
    public router: Router, public alertController:AlertController, public route:ActivatedRoute) { }
  
  async loadCompanies(){
  
      if(this.companiesService.getCompanies().length === 0)
        this.companiesService.fetchCompanies();
    
         this.companies =  this.companiesService.getCompanies();

          this.companiesChangeSubscription = this.companiesService.companiesChanged.subscribe(companies  => {
            this.companies = companies;
              });
                 
        }
    
  
  
  
  
   ngOnInit() {
    this.loadingController.create({
      message: "Caricamento aziende...", spinner:"bubbles", backdropDismiss:true
     }).then(loadingEl => {
       loadingEl.present();
      this.loadCompanies();
      loadingEl.dismiss()})
    }
  
  
  onSelectCompany(company){
    this.actionSheetController
        .create({
          buttons: [
            {
              text: 'Modifica',
              handler: () => {
                this.editCompany(company.companyId);
              }
            },
            {
              text: 'Dettagli',
              handler: () => {
                this.showCompanyDetails(company.companyId);
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
                      this.deleteCompany(company.companyId);
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
  
  deleteCompany(companyId:string){
  this.companiesService.deleteCompany(companyId);
  }
  
  editCompany(companyId:string){
  this.router.navigate(['companies/edit', companyId]);
  console.log("edit")
  }
  
  showCompanyDetails(companyId:string){
    this.router.navigate(['companies/details/',companyId]);
  }
  

  
  ngOnDestroy(){
  this.companiesChangeSubscription.unsubscribe();
  }

}
