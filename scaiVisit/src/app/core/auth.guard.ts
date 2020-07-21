import { Injectable } from '@angular/core';
import { CanLoad,  Router, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import * as localforage from "localforage";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor( private router: Router) {}
  
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return localforage.getItem("token").then(token => {
     if (!token) 
        return this.router.navigateByUrl('/login');
        else
      return true;
    }
    );
  }







}
