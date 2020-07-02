import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompaniesPage } from './companies.page';

const routes: Routes = [
  {
    path: '',
    component: CompaniesPage
  },
  {
    path: 'new',
    loadChildren: () => import('./companies-form/companies-form.module').then( m => m.CompaniesFormPageModule)
  },
  {
    path: 'edit/:companyId',
    loadChildren: () => import('./companies-form/companies-form.module').then( m => m.CompaniesFormPageModule)
  },
  {
    path: 'details/:companyId',
    loadChildren: () => import('./companies-details/companies-details.module').then( m => m.CompaniesDetailsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompaniesPageRoutingModule {}
