import { Component, ViewChild, OnInit } from "@angular/core";
import {NavController,LoadingController,Platform} from "@ionic/angular";
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { SharedService } from './../../shared/shared.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Registration } from '../registration.model';
import { RegistrationsService } from './../registrations.service';


@Component({
  selector: 'app-signature',
  templateUrl: './signature.page.html',
  styleUrls: ['./signature.page.scss'],
})
export class SignaturePage implements OnInit{

@ViewChild("signatureCanvas", {static:false}) private signatureCanvas: any;

public signaturePadOptions = {
  minWidth:2,
  penColor:'#0f618d',
  backgroundColor:'#f0f5f5',
  canvasWidth:500,
  canvasHeight:250,
};

signatureImage: string;
userId:string;
companyId:string;
registrationType:number; // 1 enter - 2 exit
registrationId:string;

constructor(
  public sharedService:SharedService,
  public navController: NavController,
  private loadingController: LoadingController,
  public route:ActivatedRoute,
  public registrationsService:RegistrationsService
) {}

ngOnInit() {

this.route.queryParamMap.subscribe(paramMap => {
  if( paramMap.get('userId') && paramMap.get('companyId') && paramMap.get('type') ){
    this.userId = paramMap.get('userId');
        this.companyId = paramMap.get('companyId');
        this.registrationType = +paramMap.get('type');
  }else{
      if( paramMap.get('registrationId') && paramMap.get('type')){
        this.registrationType = +paramMap.get('type');
        this.registrationId = paramMap.get('registrationId');
      }
      else{
        console.warn("no query params")
      }
  }
     
}); 
  
}





sign() {
 
let visit;
const signatureImage = this.signatureCanvas.toDataURL('image/jpeg');
if(this.registrationType == 1)
 visit = new Registration("1",this.userId,this.companyId,this.registrationType,new Date(),signatureImage,1 );
if(this.registrationType == 2){
  const oldVisit =  this.registrationsService.getRegistrationById(this.registrationId);
  console.log(oldVisit)
  const updatedVisit = {...oldVisit, enabled:0, externalRef: oldVisit.registrationId }
  this.registrationsService.saveRegistration(updatedVisit, "Torino");
  visit = { registrationId:(+this.registrationId)+1, userId: oldVisit.userId, companyId:oldVisit.companyId, type:2,time:new Date(),firma:signatureImage,enabled:0, externalRef: this.registrationId };
  console.log(visit)
}

this.loadingController.create({message:"Salvataggio in corso..."}).then(loadingEl =>{
  loadingEl.present();  
 this.registrationsService.saveRegistration(visit,"Torino");
  this.signatureCanvas.clear();
  this.navController.navigateForward('/registrations');
  loadingEl.dismiss();
})
}

clear() {
  this.signatureCanvas.clear();
}




}