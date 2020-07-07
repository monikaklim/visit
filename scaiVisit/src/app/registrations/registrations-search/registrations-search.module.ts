import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationsSearchPageRoutingModule } from './registrations-search-routing.module';

import { RegistrationsSearchPage } from './registrations-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegistrationsSearchPageRoutingModule
  ],
  declarations: [RegistrationsSearchPage]
})
export class RegistrationsSearchPageModule {}
