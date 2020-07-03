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
private registrations: Registration[] = [];
registrationsChanged = new Subject<Registration[]>();


constructor(public http: HttpClient, public loadingController:LoadingController) { }


  setRegistrations(registrations:Registration[]){
    this.registrations = registrations;
  }

  getRegistrations(){
    return this.registrations;
  }

  findRegistrazioniToday(sede) {

    return this.http.get<Registration[]>(this.apiUrl + "registrationstoday/" + sede).subscribe(res => this.setRegistrations(res));
  }

  findRegistrazioni(filtro) {

    return this.http.post<Registration[]>(this.apiUrl + "registrationsfiltered", filtro).subscribe(res => this.setRegistrations(res) );
  }

  findRegistrazioniPdf(filtro) {

    return this.http.post<Registration[]>(this.apiUrl + "registrationsfilteredpdf", filtro).subscribe(res => console.log(res));
  }

  saveRegistration(visita:Registration) {
    this.registrations.push(visita);
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
