import { Injectable } from '@angular/core';
import {environment} from './../../environments/environment';
import { Subject } from 'rxjs';
import { Company } from '../companies/company.model';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Registration } from './registration.model';
import { take } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

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

  setCount(count,res){
    this.count = {count:count, response:res};
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
   
    return this.http.post<any>(this.apiUrl + "registrationsfiltered", filter).subscribe(res =>
       {this.setRegistrations(res.registrazioneDaily,res); 
        console.log(filter.count)
        if(filter.count){
          console.log(filter.count)
          let countResult = [];
          let ent = 0;
          let ex = 0;
      console.log(res.registrazioneDaily)
      let i = 0;
      for(let slide of res.registrazioneDaily){
        console.log(slide)
        ent = 0;
        ex = 0;
       for( let reg of slide){
      
        if(reg.type == 1){
          ent++;
        }
        if(reg.type == 2){
          ex++;
        }
        countResult[i] = [ent,ex,reg.time];

         console.log(reg)
       }
       this.setCount(filter.count, countResult);
       i++;
      }
          
        
          this.setCountvisit(filter.countvisit,[]);
        }
      
        if(filter.countvisit){
          let countvisitResult = [];
          for(let i = 0; i< res.total; i++)
          {
           const date = res.registrazioneDaily[i][0].time;
           filter = {...filter, dateFrom: date,dateTo: date}
           this.countVisitors(filter).then(res => { countvisitResult[i] = [res, date];
           console.log(res)
          }).finally(() => this.setCountvisit(filter.countvisit,countvisitResult));
          this.setCount(filter.count,[]);
          }
        }
          
       }
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

  let index;
  for(let reg of registrations){
    index = reg.findIndex(reg => reg.idRegistrazione == visit.registrazioneId)
   }

  registrations[0].splice(index,1);
  this.setRegistrations(registrations);
}

  countVisitors(filter) {

   return this.http.post(this.apiUrl + "countdistinctperday", filter).pipe(take(1)).toPromise()
    
  
  }

  countVisitorsEnabled(filter) {
    return this.http.post(this.apiUrl + "countdistinctperdayenabled", filter).pipe(take(1)).toPromise()
  }

}
