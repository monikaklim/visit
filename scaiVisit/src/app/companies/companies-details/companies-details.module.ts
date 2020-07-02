import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompaniesDetailsPageRoutingModule } from './companies-details-routing.module';

import { CompaniesDetailsPage } from './companies-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompaniesDetailsPageRoutingModule
  ],
  declarations: [CompaniesDetailsPage]
})
export class CompaniesDetailsPageModule {}
