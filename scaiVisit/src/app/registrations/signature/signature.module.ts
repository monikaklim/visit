import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SignaturePage } from './signature.page';
import { SignaturePageRoutingModule } from './signature-routing.module';
import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignaturePageRoutingModule,
    SignaturePadModule
  ],

  declarations: [SignaturePage]
})
export class SignaturePageModule {}
