import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { RegistrationsService } from './../registrations.service';
import { SharedService } from './../../shared/shared.service';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-registrations-search',
  templateUrl: './registrations-search.page.html',
  styleUrls: ['./registrations-search.page.scss'],
})
export class RegistrationsSearchPage implements OnInit {
  count: boolean = false;
  countvisit: boolean = false;
  todaysDate:string = new Date().toISOString();
  dateFrom:string = null;
  dateTo:string = null;
  constructor( public registrationsService:RegistrationsService,public sharedService:SharedService, public loadingController:LoadingController, public navController:NavController) { }

  ngOnInit() {
  }


  onSubmit() {
    let filter = {};
    if (!this.dateTo) {
      this.dateTo = new Date().toISOString();
    }
    if (!this.dateFrom) {
      this.dateFrom = new Date(0).toISOString();
    }
    filter = {dateTo:this.dateTo, dateFrom:this.dateFrom, sede: this.sharedService.getSede(), count:this.count, countvisit:this.countvisit}
    if (this.countvisit) {
    this.loadingController.create().then(loadingEl =>{
      loadingEl.present();
      this.registrationsService.findRegistrazioni(filter);
      this.registrationsService.countVisitors(filter);
      this.navController.navigateBack("registrations");
      loadingEl.dismiss();
         }
      
  ).catch(loadingEl => loadingEl.dismiss())
   
    } else {
      this.loadingController.create()
      .then(loadingEl => {
        loadingEl.present();
        this.registrationsService.findRegistrazioni(filter);
        loadingEl.dismiss();
        this.navController.navigateBack("registrations")
        
      }).catch(loadingEl => loadingEl.dismiss())     

     
    }
  }
}



