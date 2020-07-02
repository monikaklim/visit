import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompaniesFormPageRoutingModule } from './companies-form-routing.module';

import { CompaniesFormPage } from './companies-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompaniesFormPageRoutingModule
  ],
  declarations: [CompaniesFormPage]
})
export class CompaniesFormPageModule {}
