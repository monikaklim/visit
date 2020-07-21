import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptorService } from './core/auth-interceptor.service';
import { SignaturePadModule } from 'angular2-signaturepad';
import { FileOpener } from "@ionic-native/file-opener/ngx";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,HttpClientModule, IonicModule.forRoot(), AppRoutingModule,SignaturePadModule],
  providers: [
    FileOpener,
    StatusBar,
    SplashScreen,
    {provide:HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true},
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
