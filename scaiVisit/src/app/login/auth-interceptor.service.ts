import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpParams, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(public authService:AuthService) { }



  intercept(req:HttpRequest<any>, next:HttpHandler){

  const  headers = new HttpHeaders().set(
            "Authorization",
            "Bearer " + localStorage.getItem("token") );
  const  modifiedReq = req.clone({headers:headers});
  return next.handle(modifiedReq);    
  }
 
}