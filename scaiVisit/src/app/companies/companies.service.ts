import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Company } from './company.model';
import { Subject } from 'rxjs';
import {environment} from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private apiUrl:string = environment.apiUrl;
constructor(public http: HttpClient, public loadingController:LoadingController) { }

private companies:Company[] = [];
companiesChanged = new Subject<Company[]>();
private filteredCompanies:Company[] = [];



getCompanies(){
  return this.companies;
}


getCompany(companyId:string){
  const companies = this.companies.slice();
  return companies.find(company => company.companyId == companyId);
}

setCompanies(companies){
  this.companies = companies;
  this.companiesChanged.next(this.companies)
}

getFilteredCompanies(){
  return this.filteredCompanies;
}


setFilteredCompanies(companies){
  this.filteredCompanies = companies;

}

fetchCompanies(){
return this.http.get(this.apiUrl + "companies").subscribe(res => this.setCompanies(res));
}

searchCompanies(sede) {

  return this.http.get(this.apiUrl + "companiesfromlocation/" + sede).subscribe(res => this.setCompanies(res))
}

findCompanyFiltered(filter) {
 
  return this.http.post<Company[]>(this.apiUrl + "findcompany/", filter).subscribe(res=> 
    this.setFilteredCompanies(res) );
}



deleteCompany(companyId:string){
  this.loadingController.create({
    message: "Eliminazione in corso..."
  }).then(loadingEl => {
    loadingEl.present();
  const index = this.companies.findIndex(u => u.companyId === companyId);
  this.companies.splice(index,1);
  this.http.delete(this.apiUrl + "company/" + companyId).subscribe(res => { loadingEl.dismiss()});
  this.companiesChanged.next(this.companies);
  });
}


updateCompany(company:Company){
  const companies = this.companies.slice();
  const index = companies.findIndex(u => u.companyId == company.companyId);
  companies.splice(index,1);
  companies.push(company);
  this.setCompanies(companies);

  this.http.put(this.apiUrl + "company/" + company.companyId, company).subscribe(res => console.log(res) );

}

newCompany(company:Company){
  this.companies.push(company);
  this.companiesChanged.next(this.companies);
  return this.http.post(this.apiUrl + "company", company).subscribe(res => console.log(res));
}



}
