import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {environment} from './../../environments/environment';
import { AuthService } from './../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private apiUrl:string = environment.apiUrl;
  private pdf:any
  private signature: any;
  private sedi: any;
  private azienda:any;
  private sede:any;

  constructor(public http:HttpClient, public authService:AuthService) { }

  
  /** COMPANIES **/
 fetchSedi() {
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.authService.getToken()
    );
    return this.http.get(this.apiUrl + "companylocations", {
      observe: "response",
      headers: headers
    });
  }


  setSedi(sedi){
    this.sedi = sedi;
  }
  getSedi(){
    return this.sedi;
  }
  setSede(sede){
    this.sede = sede;
  }
  getSede(){
    return this.sede;
  }
  setAzienda(azienda){
    this.azienda = azienda;
  }
  getAzienda(){
    return this.azienda;
  }




  /** PDF **/

  savePdf(data) {
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.authService.getToken()
    );
    return this.http.post(this.apiUrl + "savepdf", data, {
      observe: "response",
      headers: headers
    });
  }

  /** DOMAINS **/
  findDomains() {
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.authService.getToken()
    );
    return this.http.get(this.apiUrl + "domains", {
      observe: "response",
      headers: headers
    });
  }

  setPdf(pdf){
    this.pdf = pdf;
  }
  getPdf(){
    return this.pdf;
  }
    setSignature(signature) {
    return new Promise((resolve, reject) => {
      resolve(this.signature = signature); 
    });
  }
  getSignature(){
    return new Promise((resolve, reject) => {
      resolve(this.signature); 
    });
  }

}


