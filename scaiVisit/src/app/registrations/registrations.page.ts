import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, LoadingController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UsersService } from '../users/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Registration } from './registration.model';
import { CompaniesService } from './../companies/companies.service';
import { RegistrationsService } from './registrations.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.page.html',
  styleUrls: ['./registrations.page.scss'],
})
export class RegistrationsPage implements OnInit {
  @ViewChild(IonContent, {read: IonContent,static:true}) content: IonContent;
  registrations:Registration;
  private registrationsChangeSubscription: Subscription;
  isFiltered = false;
  todaysDate = new Date();

  constructor(public usersService:UsersService,public companiesService:CompaniesService, public registrationsService:RegistrationsService, public loadingController: LoadingController,
    public router: Router, public alertController:AlertController, public route:ActivatedRoute) { }
  

  ngOnInit() {
  }



  cancelFilter(){

  }

  scrollToBottom() {
    this.content.scrollToBottom(500);
  }
  
  scrollToTop() {
    this.content.scrollToTop(500);
  }
  


}
