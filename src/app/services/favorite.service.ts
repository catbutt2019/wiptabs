import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { LoadingController, ToastController, Platform, ActionSheetController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})

export class FavoriteService {

  favorites: Array<any>;

  constructor(
    public http: Http,
    public toastCtrl: ToastController,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
  ) 
  { 
    console.log('Hello FavoriteProvider Provider');
    this.favorites = [];
  }
/* 
  let currentUser = firebase.auth().currentUser;  
  this.afs.collection('posts')
  .add({
    title: value.title,
    profileImage: value.profileImage,
    username: value.userName,
    category: value.category,
    description: value.description,
    image: value.image,
    uid: currentUser.uid,
    date: new Date()
  })
  .then(
    res => resolve(res),
    err => reject(err)
  )
}) */

  async addFavorite(id: number): Promise<boolean> {
    if (!this.isFavorite(id)){
      this.favorites.push(id);
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('userFavourites')
      .add({
        favourite: this.favorites,
        uid: currentUser.uid,
      })
      // Schedule a single notification
   /*    this.localNotifications.schedule({
        id: id,
        text: 'Dish ' + id + ' added as a favorite successfully'
      }); */
      const toast = await this.toastCtrl.create({
        message: 'Added To Favourites',
        duration: 3000
      });
      toast.present();
    }

    console.log('favorites', this.favorites);
    return true;
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(el => el === id);
}

/* getFavorites(): Observable<Dish[]> {
  return this.dishservice.getDishes()
    .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)));
}

deleteFavorite(id: number): Observable<Dish[]> {
  let index = this.favorites.indexOf(id);
  if (index >= 0) {
    //删除对应index的数据
    this.favorites.splice(index,1);
    //返回数据
    return this.getFavorites();
  }
  else {
    console.log('Deleting non-existant favorite', id);
    return Observable.throw('Deleting non-existant favorite' + id);
              }
        } */
 
}
