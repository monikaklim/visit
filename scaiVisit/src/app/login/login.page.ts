import { Component } from '@angular/core';
import * as localforage from "localforage";
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from './auth.service';
import { SharedService } from './../shared/shared.service';
import { NgForm } from '@angular/forms';
import { UsersService } from './../users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(public navCtrl: NavController, public authService:AuthService, public sharedService:SharedService,
    public loadingController : LoadingController, public alertController : AlertController, public usersService:UsersService) {
  }

  onLogin(form:NgForm){
    if (!form.valid) {
      return;
    }
    const username = form.value.username;   //SCAI1
    const password = form.value.password;   //Scai$scai1
    if(username === '' || password === '') {
      this.alertController.create({
        header:'Errore', 
        subHeader:'Tutti i campi sono obbligatori',
        buttons:['OK']
      }).then(alertEl => {alertEl.present()});
      return;
    }     

   this.loadingController.create({
      message: "Login in corso..."
    }).then(loadingEl => {
      loadingEl.present();
    
      this.authService.login(username, password).subscribe( res => {
        if (res && res.status == 200){
              this.authService.setToken(res.body["token"]);
              localforage.setItem("token", res.body["token"]);
             localStorage.setItem("token",res.body["token"]);

              this.sharedService.fetchSedi().subscribe( response => {
                if(response.status == 200){
                  this.sharedService.setSedi(response.body["location"]);
                }else if(response.status == 403){
                  this.navCtrl.navigateRoot('login');
                }
              })
              localforage.getItem("options").then((result) => {
                if(result){
                  this.sharedService.setSede(result["domain"]);
                  this.navCtrl.navigateRoot('users');
                  loadingEl.dismiss();
                }else{
                  let opzioni = {
                    domain : this.sharedService.getSede()
                  }
                  this.sharedService.setSede(this.sharedService.getSede());
                  localforage.setItem("options", opzioni);
                  this.navCtrl.navigateRoot('users');
                  loadingEl.dismiss();
                }
              })
        }else{
          
           this.alertController.create({
            header:'Errore', 
            subHeader:'Credenziali errate',
            buttons:['OK']
          }).then(alertEl => {alertEl.present()});
         
          loadingEl.dismiss();
          return;
        }
      },
      error => {
        console.error('Login error');
        console.log(error);
        if (error.status == 0){
         this.alertController.create({
            header:'Errore', 
            subHeader:'Server non raggiungibile',
            buttons:['OK']
          }).then(alertEl => {
             alertEl.present();
            loadingEl.dismiss();
          });
          return;
        }else if (error.status == 401){
         this.alertController.create({
           header:'Errore', 
            subHeader:'Credenziali errate',
            buttons:['OK']
          }).then(alertEl => {
            alertEl.present();
            loadingEl.dismiss();
          });
          return;
        }else{
           this.alertController.create({
            header:'Errore', 
            subHeader:'Errore sconosciuto',
            buttons:['OK']
          }).then(alertEl => {
            alertEl.present();
            loadingEl.dismiss();
          });
          return;
        }
      },
      () => {
       
         
          console.log("Login successful")
    
  
      }
    );
   
  });
    form.reset(); 
   
  }
  

  
}
