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
  selector: 'app-details-feed',
  templateUrl: './details-feed.page.html',
  styleUrls: ['./details-feed.page.scss'],
})
export class DetailsFeedPage implements OnInit {

  favorite: any;

  image: any;
  public imageLists: any[] = [];
  item: any;
  load: boolean = false
  category: string;
  favoriteButton: boolean;
  favoriteUsers : any =[];


 
 comments: any = [];
 comment: string;
 followButton: boolean;
  currentUser: any;



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
  ) { 
    this.route.params.subscribe(params=> {
      this.firebaseService.getObjectById(params['data']).subscribe( i => {
        this.item = i;
                   })
             });
  }

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
       console.log(this.item) 
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
  
  favoriteUser(){
    let currentUser = firebase.auth().currentUser;
    let data = {
      userFollowing: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
    }
    this.firebaseService.updatePost(this.item.id,data)
   
    
    this.followButton = true;
  }

  addComment(){
    let currentUser = firebase.auth().currentUser;
    let data = {
    comments: firebase.firestore.FieldValue.arrayUnion(this.comment)
    }
    this.firebaseService.updatePost(this.item.id,data)
    this.getData();
  }
 

  addToComments(this){
    this.comments.push({ comment: this.comment});
    let data = {
      comments: this.comments,
    }
    this.firebaseService.updatePost(this.item.id,data)
    .then(
      res => {
       //do something else
      }
    )
  }


}
