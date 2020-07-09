import { Injectable } from '@angular/core';
import {environment} from './../../environments/environment';
import { Subject } from 'rxjs';
import { Company } from '../companies/company.model';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Registration } from './registration.model';


@Injectable({
  providedIn: 'root'
})
export class RegistrationsService {

private apiUrl:string = environment.apiUrl;
private registrations: Array<any> = [];
registrationsChanged = new Subject<any>();
responseChanged = new Subject<any>();
countvisitChanged = new Subject<any>();
countChanged = new Subject<any>();
private countvisit = {count:false, response: []};
private count = {count:false, response: []};
private registrationsResponse = null;

constructor(public http: HttpClient, public loadingController:LoadingController) { }


  setRegistrations(registrations, response?){

    this.registrations = registrations;
    this.registrationsChanged.next(this.registrations);
    console.log(this.registrations)
    if(response){
      this.registrationsResponse = response;
      this.responseChanged.next(this.registrationsResponse);
    }

  }


  setCountvisit(count,res){
    this.countvisit = {count:count, response:res};
     this.countvisitChanged.next(this.countvisit);
  }

  setCount(count){
    this.count = count;
    this.countChanged.next(this.count);

}
  getRegistrations(){
    return this.registrations;
  }
  getRegistrationById(id:string){
    const registrations = this.registrations.slice();
    let registration = null;
    for(let reg of registrations){
     registration = reg.find(registr => registr.registrazioneId == id);
    }

    return registration;
  }

  findRegistrazioniToday(sede) {

    return this.http.get<any>(this.apiUrl + "registrationstoday/" + sede).subscribe(res => {this.setRegistrations(res.registrazioneDaily,res)});
  }

  findRegistrazioni(filter) {
    this.setCount(filter.count)
    return this.http.post<any>(this.apiUrl + "registrationsfiltered", filter).subscribe(res =>
       {this.setRegistrations(res.registrazioneDaily,res); 
        this.setCount(filter.count) }
      );
  }

  findRegistrazioniPdf(filter) {

    return this.http.post<any>(this.apiUrl + "registrationsfilteredpdf", filter).subscribe(res => this.setRegistrations(res.registrazioneDaily,res));
  }

  saveRegistration(visit:Registration,sede) {
    const registrations = this.registrations.slice();

   this.setRegistrations(registrations);
    return this.http.post(this.apiUrl + "registration", visit).subscribe(res => this.findRegistrazioniToday(sede));
  }

updateRegistration(visit){
  const registrations = this.registrations.slice();
  console.log(visit)
  let index;
  for(let reg of registrations){
    index = reg.findIndex(reg => reg.idRegistrazione == visit.registrazioneId)
   }

  registrations[0].splice(index,1);
  console.log(index)
  console.log(registrations)
  this.setRegistrations(registrations);
}

  countVisitors(filter) {

    return this.http.post(this.apiUrl + "countdistinctperday", filter).subscribe(res => this.setCountvisit(filter.countvisit,res));
  }

  countVisitorsEnabled(filter) {

    return this.http.post(this.apiUrl + "countdistinctperdayenabled", filter).subscribe(res => console.log(res));
  }

}
