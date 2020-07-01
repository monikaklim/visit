import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserSearchPageRoutingModule } from './user-search-routing.module';

import { UserSearchPage } from './user-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UserSearchPageRoutingModule
  ],
  declarations: [UserSearchPage]
})
export class UserSearchPageModule {}
