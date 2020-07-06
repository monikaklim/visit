import { Component, ViewChild, OnInit } from "@angular/core";
import {NavController,LoadingController,Platform} from "@ionic/angular";
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import * as pdfMake from "pdfmake/build/pdfmake.js";
import * as pdfFonts from "pdfmake/build/vfs_fonts.js";
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { SharedService } from './../../shared/shared.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Registration } from '../registration.model';
import { RegistrationsService } from './../registrations.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-signature',
  templateUrl: './signature.page.html',
  styleUrls: ['./signature.page.scss'],
})
export class SignaturePage implements OnInit{

@ViewChild("signatureCanvas", {static:false}) private signatureCanvas: any;
pdfDocGenerator: any;
public signaturePadOptions: Object = {
  minWidth: 2,
  canvasWidth: 340,
  canvasHeight: 200
};
signatureImage: string;
userId:string;
companyId:string;
registrationType:number; // 1 enter - 2 exit

constructor(
  public sharedService:SharedService,
  public navController: NavController,
  private loadingController: LoadingController,
  private platform: Platform,
  public route:ActivatedRoute,
  public registrationsService:RegistrationsService
) {}

ngOnInit() {

  this.route.queryParamMap.subscribe(paramMap => {

      this.userId = paramMap.get('userId');
      this.companyId = paramMap.get('companyId');
      this.registrationType = +paramMap.get('type');
     
    }); 
    console.log(this.userId)
    console.log(this.companyId)
}



public SignaturePadOptions = {
  'minWidth':2,
  'penColor':'rgb(66,133,244)',
  'backgroundColor':'rgb(255,255,255)',
  'canvasWidth':450,
  'canvasHeight':150,
};



sign() {

const signatureImage = this.signatureCanvas.toDataURL('image/jpeg');
console.log(signatureImage)
let visit = new Registration("1",this.userId,this.companyId,this.registrationType,new Date(),signatureImage,1 );
this.loadingController.create({message:"Salvataggio in corso..."}).then(loadingEl =>{
  loadingEl.present();  
  this.registrationsService.saveRegistration(visit);
  loadingEl.dismiss();
  this.navController.navigateForward('/registrations');
}
)
}

clear() {
  this.signatureCanvas.clear();
}




}