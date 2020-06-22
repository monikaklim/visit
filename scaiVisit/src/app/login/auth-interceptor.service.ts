import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(public authService:AuthService) { }

  intercept(req:HttpRequest<any>, next:HttpHandler){
   let headers = new HttpHeaders().set(
            "Authorization",
            "Bearer " + this.authService.getToken()
          );
       const modifiedReq = req.clone({headers:headers})
        return next.handle(modifiedReq);
    
}

}