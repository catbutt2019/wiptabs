import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FavoriteService } from '../services/favorite.service';
import { present } from '@ionic/core/dist/types/utils/overlays';
import { CommentService } from '../services/comment.service';
import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';


@Component({
  selector: 'app-follow-project-details',
  templateUrl: './follow-project-details.page.html',
  styleUrls: ['./follow-project-details.page.scss'],
})
export class FollowProjectDetailsPage implements OnInit {

  favorite: any;

  image: any;
  public imageLists: any[] = [];
  item: any;
  load: boolean = false;
  category: string;
  favoriteButton: boolean;
  favoriteUsers : any =[];


 
 comments: Array<{comment: string}> = [];
 comment: string;


  constructor(
    private imagePicker: ImagePicker,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private webview: WebView,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private favoriteservice: FavoriteService,
    private CommentService: CommentService,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.getData();
    this.favoriteButton = false;
  }
  getData(){
    this.route.data.subscribe(routeData => {
     let data = routeData['data'];
     if (data) {
       this.item = data;
       this.image = this.item.image;   
     }
    }) 
      
  }

  navigateBack() {
    this.navCtrl.back();
  }

 async addToFavorites() {
    console.log('Adding to Favorites', this.item);
    this.favorite = this.favoriteservice
    .addFavorite(this.item);
    this.favoriteButton = true;
  }
  
 

}
