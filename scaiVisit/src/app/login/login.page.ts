import { Component } from '@angular/core';
import * as localforage from "localforage";
import { NavController, NavParams, LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from './auth.service';
import { SharedService } from './../shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  username: string = ""; //SCAI1
  password: string = ""; //Scai$scai1

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthService, public sharedService:SharedService,
    public loadingController : LoadingController, public alertController : AlertController) {
  }

  login(){
    if(this.username === '' || this.password === '') {
      this.alertController.create({
        header:'Login Error', 
        subHeader:'All fields are required',
        buttons:['OK']
      }).then(alertEl => {alertEl.present()});
      return;
    }     

    this.loadingController.create({
      message: "Logging in..."
    }).then(loadingEl => {loadingEl.present()});
  

      this.authService.login(this.username, this.password).subscribe( res => {
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
                  this.sharedProvider.setSede(result["domain"]);
                  this.navCtrl.setRoot(RegistrationsPage);
                }else{
                  let opzioni = {
                    domain : constants.sede
                  }
                  this.sharedProvider.setSede(constants.sede);
                  localforage.setItem("options", opzioni);
                  this.navCtrl.setRoot(RegistrationsPage);
                }
              })
              /**/
              // this.navCtrl.setRoot( RegistrationsPage );  
              loader.dismissAll();
        }else{
          this.username = '';
          this.password = '';
          let alert = this.alertController.create({
            header:'Login Error', 
            subHeader:'Credenziali errate',
            buttons:['OK']
          });
          alert.present();
          loader.dismissAll();
          return;
        }
      },
      error => {
        this.username = '';
        this.password = '';
        console.log('onError login' + error);
        console.log(error);
        if (error.status == 0){
          let alert = this.alertController.create({
            header:'Server Error', 
            subHeader:'Server non raggiungibile',
            buttons:['OK']
          });
          alert.present();
          loader.dismissAll();
          return;
        }else if (error.status == 401){
          let alert = this.alertController.create({
           header:'Login Error', 
            subHeader:'Credenziali errate',
            buttons:['OK']
          });
          alert.present();
          loader.dismissAll();
          return;
        }else{
          let alert = this.alertController.create({
            header:'Error', 
            subHeader:'Unknown Error',
            buttons:['OK']
          });
          alert.present();
          loader.dismissAll();
          return;
        }
      },
      () => console.log('onCompleted login')
    );
  }
  
}
