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
  private visita: any;
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

  findCompanies() {
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.authService.getToken()
    );
    return this.http.get(this.apiUrl + "companies", {
      observe: "response",
      headers: headers
    });
  }
  searchCompanies(sede) {
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.authService.getToken()
    );
    return this.http.get(this.apiUrl + "companiesfromlocation/" + sede, {
      observe: "response",
      headers: headers
    });
  }

  findCompanyFiltered(filter) {
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.authService.getToken()
    );
    return this.http.post(this.apiUrl + "findcompany/", filter, {
      observe: "response",
      headers: headers
    });
  }

  saveCompany(company) {
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.authService.getToken()
    );
    return this.http.post(this.apiUrl + "company", company, {
      observe: "response",
      headers: headers
    });
  }

  updateCompany(company) {
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.authService.getToken()
    );
    return this.http.put(this.apiUrl + "company/" + company.companyId, company, {
      observe: "response",
      headers: headers
    });
  }

  deleteCompany(companyId) {
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.authService.getToken()
    );
    return this.http.delete(this.apiUrl + "companies/" + companyId, {
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


  /** USERS **/

  saveUser(user) {
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.authService.getToken()
    );
    return this.http.post(this.apiUrl + "user", user, {
      observe: "response",
      headers: headers
    });
  }

  updateUser(user) {
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.authService.getToken()
    );
    return this.http.put(this.apiUrl + "user/" + user.userId, user, {
      observe: "response",
      headers: headers
    });
  }

  deleteUser(userid) {
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.authService.getToken()
    );
    return this.http.delete(this.apiUrl + "user/" + userid, {
      observe: "response",
      headers: headers
    });
  }

  // findAllUsers(){
  //   let headers = new HttpHeaders().set('Authorization', 'Bearer '+this.authService.getToken());
  //   return this.http.get(this.apiUrl+"users", {headers : headers});
  // }
  findAllUsers() {
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.authService.getToken()
    );
    return this.http.get(this.apiUrl + "usersenabled", {
      observe: "response",
      headers: headers
    });
  }

  findUserFiltered(filtro) {
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.authService.getToken()
    );
    return this.http.post(this.apiUrl + "usersfiltered/", filtro, {
      observe: "response",
      headers: headers
    });
  }

  /** REGISTRATIONS **/

  findRegistrazioniToday(sede) {
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.authService.getToken()
    );
    return this.http.get(this.apiUrl + "registrationstoday/" + sede, {
      observe: "response",
      headers: headers
    });
  }

  findRegistrazioni(filtro) {
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.authService.getToken()
    );
    return this.http.post(this.apiUrl + "registrationsfiltered", filtro, {
      observe: "response",
      headers: headers
    });
  }

  findRegistrazioniPdf(filtro) {
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.authService.getToken()
    );
    return this.http.post(this.apiUrl + "registrationsfilteredpdf", filtro, {
      observe: "response",
      headers: headers
    });
  }

  saveRegistration(visita) {
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.authService.getToken()
    );
    return this.http.post(this.apiUrl + "registration", visita, {
      observe: "response",
      headers: headers
    });
  }

  closeRegistration(idVisita) {
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.authService.getToken()
    );
    return this.http.post(this.apiUrl + "closeregistration", idVisita, {
      observe: "response",
      headers: headers
    });
  }

  countVisitors(filtro) {
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.authService.getToken()
    );
    return this.http.post(this.apiUrl + "countdistinctperday", filtro, {
      observe: "response",
      headers: headers
    });
  }

  countVisitorsEnabled(filtro) {
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.authService.getToken()
    );
    return this.http.post(this.apiUrl + "countdistinctperdayenabled", filtro, {
      observe: "response",
      headers: headers
    });
  }

  setVisita(visita){
    this.visita = visita;
  }
  getVisita(){
    return this.visita;
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


