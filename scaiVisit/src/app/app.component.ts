import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './login/auth.service';
import { UsersService } from './users/users.service';
import { LoadingController } from '@ionic/angular';
import { RegistrationsService } from './registrations/registrations.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authService:AuthService,
    public navCtrl: NavController,
    public usersService:UsersService,
    public loadingController:LoadingController,
    public registrationsService:RegistrationsService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if(localStorage.getItem("token")){
        this.loadingController.create({message:"Caricamento..."}).then(loadingEl =>{
          loadingEl.present();
          this.usersService.fetchUsers();
          this.registrationsService.findRegistrazioniToday("Torino");
          loadingEl.dismiss();
          this.navCtrl.navigateForward("/users");
        })
      }
  });
}
  onLogout(){
    this.authService.logout();
    this.navCtrl.navigateRoot('login');
  }
}
