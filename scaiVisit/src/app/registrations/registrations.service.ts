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


constructor(public http: HttpClient, public loadingController:LoadingController) { }


  setRegistrations(registrations){
    this.registrations = registrations;
    this.registrationsChanged.next(this.registrations);
  }

  getRegistrations(){
    return this.registrations;
  }
  getRegistrationById(id:string){
    const registrations = this.registrations.slice();
    return registrations.find(reg => reg.registrazioneId == id);
  }

  findRegistrazioniToday(sede) {

    return this.http.get<any>(this.apiUrl + "registrationstoday/" + sede).subscribe(res => {this.setRegistrations(res.registrazioneDaily[0])});
  }

  findRegistrazioni(filtro) {

    return this.http.post<any>(this.apiUrl + "registrationsfiltered", filtro).subscribe(res => this.setRegistrations(res.registrazioneDaily[0]) );
  }

  findRegistrazioniPdf(filtro) {

    return this.http.post<any>(this.apiUrl + "registrationsfilteredpdf", filtro).subscribe(res => console.log(res));
  }

  saveRegistration(visit:Registration) {
    const registrations = this.registrations.slice();
    if(visit.type == 1)
    registrations.push(visit);
    console.log(visit)
   this.setRegistrations(registrations);
    return this.http.post(this.apiUrl + "registration", visit).subscribe(res => console.log(res));
  }

updateRegistration(visit){
  const registrations = this.registrations.slice();
  console.log(visit)
  const index = registrations.findIndex(reg => reg.registrazioneId == visit.registrazioneId)
  registrations.splice(index,1);
  this.setRegistrations(registrations);
}

  countVisitors(filtro) {

    return this.http.post(this.apiUrl + "countdistinctperday", filtro).subscribe(res => console.log(res));
  }

  countVisitorsEnabled(filtro) {

    return this.http.post(this.apiUrl + "countdistinctperdayenabled", filtro).subscribe(res => console.log(res));
  }

}
