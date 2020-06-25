import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersPage } from './users.page';

const routes: Routes = [
  {
    path: '',
    component: UsersPage
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./user-form/user-form.module').then( m => m.UserFormPageModule)
  },
  {
    path: 'new',
    loadChildren: () => import('./user-form/user-form.module').then( m => m.UserFormPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersPageRoutingModule {}
