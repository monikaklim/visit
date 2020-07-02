import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompaniesDetailsPage } from './companies-details.page';

const routes: Routes = [
  {
    path: '',
    component: CompaniesDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompaniesDetailsPageRoutingModule {}
