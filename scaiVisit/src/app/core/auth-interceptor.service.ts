import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NavController } from '@ionic/angular';
import * as localforage from "localforage";
import { AuthService } from '../login/auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(public authService:AuthService, public navCtrl:NavController) { }



  intercept(req:HttpRequest<any>, next:HttpHandler){

  const  headers = new HttpHeaders().set(
            "Authorization",
            "Bearer " + localStorage.getItem("token") );
  const  modifiedReq = req.clone({headers:headers});
  return next.handle(modifiedReq).pipe(
    catchError(
      (err, caught) => {
        if (err.status === 403){
          this.handleAuthError();
          return of(err);
        }
        throw err;
      }
    )
  );  
  }
 
  handleAuthError(){
    localStorage.removeItem("token");
    localforage.removeItem("token");
    this.navCtrl.navigateRoot("login");
  }

}