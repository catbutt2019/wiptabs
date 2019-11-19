import { Component } from '@angular/core';

import { Plugins } from '@capacitor/core';
import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import {Router} from '@angular/router'
import { AuthenticateService } from './services/authentication.service';
import { NavController } from '@ionic/angular';

const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  pages: any[] =[];
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private router: Router
  ) {
    this.initializeApp();
   
  }

  initializeApp() {
    firebase.initializeApp(environment.firebase);
    SplashScreen.hide();
    this.pages = [{
      pagename: "Edit Profile",
      icon: "home",
      url: "/tabs/edit-profile"
    }, {
      pagename: "Favorites",
      icon: "heart",
      url: "/tabs/favorites"
    }
  ]


    StatusBar.hide().catch(error => {
      console.error(error);
    });
  }

  Goto(page) {
    this.router.navigate([page.url]);
  }

  logout(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    })
  }

}
