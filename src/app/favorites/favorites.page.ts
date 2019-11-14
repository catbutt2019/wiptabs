import { Component, OnInit,ViewChild  } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { EventService } from '../services/event.service';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { ProfileService } from '../services/profile.service';
import { FirebaseService } from '../services/firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  favoriteList = []; 
  public favoriteListRef: firebase.firestore.CollectionReference;

  constructor(
    private firestore: AngularFirestore,
    private navCtrl: NavController,
    private authService: AuthenticateService,
    public loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService,
    private favoriteService: FavoriteService,
    private profileService: ProfileService,
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit() {

    this.favoriteService.getfavoriteList().then(favoriteListSnapshot => {
      this.favoriteList = [];
      favoriteListSnapshot.forEach(snap => {
        this.favoriteList.push({
          id: snap.id,
          favoriteList: snap.data().favourite
        });
        console.log(snap.data().favourite)
        return false;
      });
    }); 
    
  }

 

}
