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
  selector: 'app-follow-projects',
  templateUrl: './follow-projects.page.html',
  styleUrls: ['./follow-projects.page.scss'],
})
export class FollowProjectsPage implements OnInit {
  items: Array<any>;
  public eventList: Array<any>;
  public eventListRef: firebase.firestore.CollectionReference;
  public favoriteListRef: firebase.firestore.CollectionReference;
  profileImage : string;
  userName: string;
  userBio: string;
  userDetails: any;
  students: any;
  studentName: string;
  studentAge: number;
  studentAddress: string;
  data
  itemslength: any = [];
  userEmail: string;

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

       
    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
    }else{
      this.navCtrl.navigateBack('');
    }

    if (this.route && this.route.data) {
      this.getData();
      
    }
  }

  async getData(){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    this.route.data.subscribe(routeData => {
      routeData['data'].subscribe(data => {
        console.log(data)
        loading.dismiss();
        this.items = data;
        this.itemslength.push(data.length); 
     
      })
    })
  }


  async presentLoading(loading) {
    return await loading.present();
  }
 

}
