import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { IonicModule } from '@ionic/angular';

import { RegistrationsPageRoutingModule } from './registrations-routing.module';

import { RegistrationsPage } from './registrations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationsPageRoutingModule
  ],
  providers: [FileOpener],
  declarations: [RegistrationsPage]
})
export class RegistrationsPageModule {}
