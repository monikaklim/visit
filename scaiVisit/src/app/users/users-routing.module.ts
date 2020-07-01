import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersPage } from './users.page';

const routes: Routes = [
  {
    path: '',
    component: UsersPage
  },
  {
    path: 'edit/:userId',
    loadChildren: () => import('./user-form/user-form.module').then( m => m.UserFormPageModule)
  },
  {
    path: 'new',
    loadChildren: () => import('./user-form/user-form.module').then( m => m.UserFormPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./user-search/user-search.module').then( m => m.UserSearchPageModule)
  },
  {
    path: 'details/:userId',
    loadChildren: () => import('./user-details/user-details.module').then( m => m.UserDetailsPageModule)
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersPageRoutingModule {}
