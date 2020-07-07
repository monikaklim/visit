import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationsSearchPage } from './registrations-search.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrationsSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationsSearchPageRoutingModule {}
