import { Component } from '@angular/core';

import { Plugins } from '@capacitor/core';
import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import {Router} from '@angular/router'

const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  pages: any[] =[];
  constructor(
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
      icon: "home",
      url: "/tabs/favorites"
    },
    {
      pagename: "logout",
      icon: "home",
      url: "/pagethree"
    }
  ]


    StatusBar.hide().catch(error => {
      console.error(error);
    });
  }

  Goto(page) {
    this.router.navigate([page.url]);
  }
}
