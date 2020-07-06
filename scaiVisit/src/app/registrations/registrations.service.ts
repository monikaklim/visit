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
private registrations: any = {};
registrationsChanged = new Subject<any>();


constructor(public http: HttpClient, public loadingController:LoadingController) { }


  setRegistrations(registrations){
    this.registrations = registrations;
    this.registrationsChanged.next(this.registrations);
  }

  getRegistrations(){
    return this.registrations;
  }
  getRegistrationById(id){
    return this.registrations.find(reg => reg.registrazioneId == id);
  }

  findRegistrazioniToday(sede) {

    return this.http.get<any>(this.apiUrl + "registrationstoday/" + sede).subscribe(res => {this.setRegistrations(res.registrazioneDaily[0])});
  }

  findRegistrazioni(filtro) {

    return this.http.post<any>(this.apiUrl + "registrationsfiltered", filtro).subscribe(res => this.setRegistrations(res) );
  }

  findRegistrazioniPdf(filtro) {

    return this.http.post<any>(this.apiUrl + "registrationsfilteredpdf", filtro).subscribe(res => console.log(res));
  }

  saveRegistration(visita:Registration) {
    this.registrations.push(visita);
    console.log(visita)
    return this.http.post(this.apiUrl + "registration", visita).subscribe(res => console.log(res));
  }

  closeRegistration(idVisita) {

    return this.http.post(this.apiUrl + "closeregistration", idVisita).subscribe(res => console.log(res));
  }

  countVisitors(filtro) {

    return this.http.post(this.apiUrl + "countdistinctperday", filtro).subscribe(res => console.log(res));
  }

  countVisitorsEnabled(filtro) {

    return this.http.post(this.apiUrl + "countdistinctperdayenabled", filtro).subscribe(res => console.log(res));
  }

}
