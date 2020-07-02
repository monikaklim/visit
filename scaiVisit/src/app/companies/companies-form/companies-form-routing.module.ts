import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompaniesFormPage } from './companies-form.page';

const routes: Routes = [
  {
    path: '',
    component: CompaniesFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompaniesFormPageRoutingModule {}
