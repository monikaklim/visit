import { Component, ViewChild, OnInit } from "@angular/core";
import {NavController,LoadingController,Platform} from "@ionic/angular";
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import * as pdfMake from "pdfmake/build/pdfmake.js";
import * as pdfFonts from "pdfmake/build/vfs_fonts.js";
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { SharedService } from './../../shared/shared.service';
import { ActivatedRoute } from '@angular/router';

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
  public route:ActivatedRoute
) {}

ngOnInit() {
  this.route.paramMap.subscribe(paramMap => {
    if (!paramMap.has('userId') || !paramMap.has('companyId') || !paramMap.has('type')) {
      this.navController.navigateBack('/users');
      }
     else{
      this.userId = paramMap.get('userId');
      this.companyId = paramMap.get('companyId');
      this.registrationType = +paramMap.get('type');
     }
    });
  
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

  let visit = { signature:signatureImage };

  let data = { shouldReload: true, visita: visita };

}

clear() {
  this.signatureCanvas.clear();
}




}