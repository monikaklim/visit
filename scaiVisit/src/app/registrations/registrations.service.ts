import { Injectable } from '@angular/core';
import {environment} from './../../environments/environment';
import { Subject } from 'rxjs';
import { Company } from '../companies/company.model';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RegistrationsService {

private apiUrl:string = environment.apiUrl;

companiesChanged = new Subject<Company[]>();


constructor(public http: HttpClient, public loadingController:LoadingController) { }



}
