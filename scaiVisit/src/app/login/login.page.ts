import { Component } from '@angular/core';
import * as localforage from "localforage";
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from './auth.service';
import { SharedService } from './../shared/shared.service';
import constants from "../../config/constants";
import { HomePage } from '../home/home.page';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

 //SCAI1
  //Scai$scai1

  constructor(public navCtrl: NavController, public authService:AuthService, public sharedService:SharedService,
    public loadingController : LoadingController, public alertController : AlertController) {
  }

  onLogin(form:NgForm){
    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;
    if(username === '' || password === '') {
      this.alertController.create({
        header:'Login Error', 
        subHeader:'All fields are required',
        buttons:['OK']
      }).then(alertEl => {alertEl.present()});
      return;
    }     

   this.loadingController.create({
      message: "Logging in..."
    }).then(loadingEl => {
      loadingEl.present();
    
      this.authService.login(username, password).subscribe( res => {
        if (res && res.status == 200){
              this.authService.setToken(res.body["token"]);
              localforage.setItem("token", res.body["token"]);
              this.sharedService.fetchSedi().subscribe( response => {
                if(response.status == 200){
                  this.sharedService.setSedi(response.body["location"]);
                }else if(response.status == 403){
                  
                }
              })
              localforage.getItem("options").then((result) => {
                if(result){
                  this.sharedService.setSede(result["domain"]);
                  this.navCtrl.navigateRoot('home');
                  loadingEl.dismiss();
                }else{
                  let opzioni = {
                    domain : constants.sede
                  }
                  this.sharedService.setSede(constants.sede);
                  localforage.setItem("options", opzioni);
                  this.navCtrl.navigateRoot('home');
                  loadingEl.dismiss();
                }
              })
        }else{
          
           this.alertController.create({
            header:'Login Error', 
            subHeader:'Credenziali errate',
            buttons:['OK']
          }).then(alertEl => {alertEl.present()});
         
          loadingEl.dismiss();
          return;
        }
      },
      error => {
     
        console.log('onError login' + error);
        console.log(error);
        if (error.status == 0){
         this.alertController.create({
            header:'Server Error', 
            subHeader:'Server non raggiungibile',
            buttons:['OK']
          }).then(alertEl => {
             alertEl.present();
            loadingEl.dismiss();
          });
          return;
        }else if (error.status == 401){
         this.alertController.create({
           header:'Login Error', 
            subHeader:'Credenziali errate',
            buttons:['OK']
          }).then(alertEl => {
            alertEl.present();
            loadingEl.dismiss();
          });
          return;
        }else{
           this.alertController.create({
            header:'Error', 
            subHeader:'Unknown Error',
            buttons:['OK']
          }).then(alertEl => {
            alertEl.present();
            loadingEl.dismiss();
          });
          return;
        }
      },
      () => console.log('onCompleted login')
    
    );
   
  });
    form.reset(); 
  }
  

  
}
