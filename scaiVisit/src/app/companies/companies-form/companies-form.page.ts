import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { CompaniesService } from '../companies.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Company } from '../company.model';

@Component({
  selector: 'app-companies-form',
  templateUrl: './companies-form.page.html',
  styleUrls: ['./companies-form.page.scss'],
})
export class CompaniesFormPage implements OnInit {

  constructor(public route:ActivatedRoute, public navController:NavController, public companiesService:CompaniesService, public formBuilder:FormBuilder, public loadingController:LoadingController) { }
  isEditMode:boolean = false;
  form: FormGroup;
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
        this.isEditMode = false;
      this.form =  this.formBuilder.group({
         name: [
            "",
            Validators.compose([Validators.required, Validators.minLength(1)])
          ],
        city: [
            "",
            Validators.compose([Validators.required, Validators.minLength(1)])
          ],
         address: [
            "",
            Validators.compose([Validators.required, Validators.minLength(1)])
          ],
          referent: [""]
          
        });
        return;
      }
      else{
        this.isEditMode = true;

        this.companyId = paramMap.get('companyId');
        this.isLoading = true;
        this.company = this.companiesService.getCompany(paramMap.get('companyId'));
       
        console.log( this.companiesService.getCompany(paramMap.get('companyId')))
       
       this.form = this.formBuilder.group({
               name: new FormControl(this.company.name, {
                  updateOn: 'blur',
                  validators: [Validators.required]
                }),
              city: new FormControl(this.company.city, {
                  updateOn: 'blur',
                  validators: [Validators.required]
                }),
              address: new FormControl(this.company.address, {
                  updateOn: 'blur',
                  validators: [Validators.required]
                }),
              referent: new FormControl(this.company.referent, {
                  updateOn: 'blur'
                }),

              });
              this.isLoading = false;
            }
           
      });

      }
   


onSubmit(){
  let uId = "0";
  if(this.isEditMode && this.companyId){
    uId = this.companyId;
  }
  const company = {companyId:uId,name:this.form.controls.name.value,city:this.form.controls.city.value, 
  address:this.form.controls.address.value,referent:this.form.controls.referent.value}
  this.loadingController.create({message:'Salvataggio in corso...'}).then(loadingEl =>{
    loadingEl.present(); 
    if(this.isEditMode)
      this.companiesService.updateCompany(company);
    else
      this.companiesService.newCompany(company);
      setTimeout(()  => {loadingEl.dismiss(); this.navController.navigateBack('companies'); }, 2500)
    }
  );
 
 
}
}
