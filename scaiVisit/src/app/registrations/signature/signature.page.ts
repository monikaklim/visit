import { Component, ViewChild } from "@angular/core";
import {NavController,LoadingController,Platform} from "@ionic/angular";
import { SignaturePad } from "angular2-signaturepad/signature-pad";
import * as pdfMake from "pdfmake/build/pdfmake.js";
import * as pdfFonts from "pdfmake/build/vfs_fonts.js";
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { SharedService } from './../../shared/shared.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-signature',
  templateUrl: './signature.page.html',
  styleUrls: ['./signature.page.scss'],
})
export class SignaturePage {
@ViewChild("signatureCanvas") private signatureCanvas: any;
@ViewChild(SignaturePad) public signaturePad: SignaturePad;
data: any;
azienda: any = "";
sede: any;
aziende: Array<any> = [];
sedi: Array<any> = [];
pdfDocGenerator: any;

public signaturePadOptions: Object = {
  minWidth: 2,
  canvasWidth: 340,
  canvasHeight: 200
};
public signatureImage: string;

constructor(
  public sharedService:SharedService,
  public navController: NavController,
  private loadingController: LoadingController,
  private platform: Platform,
) {}

ionViewWillEnter() {
  this.azienda = "";
  if (this.sharedService.multipleCompanies) {
    this.azienda = this.sharedService.getAzienda();
  } else {
    this.azienda = this.sharedService.azienda;
  }
}
ionViewDidEnter() {
  this.sedi = this.sharedService.getSedi();
  this.sede = this.sharedService.getSede();
}

}