import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationsPage } from './registrations.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrationsPage
  },
  {
    path: 'signature',
    loadChildren: () => import('./signature/signature.module').then( m => m.SignaturePageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./registrations-search/registrations-search.module').then( m => m.RegistrationsSearchPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationsPageRoutingModule {}
