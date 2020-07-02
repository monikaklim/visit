import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Company } from '../company.model';
import { CompaniesService } from '../companies.service';

@Component({
  selector: 'app-companies-details',
  templateUrl: './companies-details.page.html',
  styleUrls: ['./companies-details.page.scss'],
})
export class CompaniesDetailsPage implements OnInit {

 
  constructor(public route:ActivatedRoute, public navController:NavController, public companiesService:CompaniesService,  public loadingController:LoadingController) { }

 companyId:string;
 company:Company;
  isLoading:boolean = false;

    ngOnInit() {


    if(this.companiesService.getCompanies().length === 0){
      this.navController.navigateBack('companies');
      return;
    }

    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('companyId')) {
        this.navController.navigateBack('companies');
        }
       else{
        this.companyId = paramMap.get('userId');
        this.isLoading = true;
        this.company = this.companiesService.getCompany(paramMap.get('companyId'));

        if(this.company){
          this.isLoading = false;
        }
       }
      });

    }

}
