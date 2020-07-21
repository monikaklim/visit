import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './core/auth.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registrations',
    loadChildren: () => import('./registrations/registrations.module').then( m => m.RegistrationsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'companies',
    loadChildren: () => import('./companies/companies.module').then( m => m.CompaniesPageModule),
    canLoad: [AuthGuard]
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
