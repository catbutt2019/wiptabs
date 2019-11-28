import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private snapshotChangesSubscription: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ){}

  

  getPosts(){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afAuth.user.subscribe(currentUser => {
        if(currentUser){
          this.snapshotChangesSubscription = 
          this.afs.collection('posts', ref=> ref
          .where('category', '==', 'Wipping') 
          .where('uid','==', currentUser.uid
          ).orderBy("date", "desc")).snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      })
    })
  }

  getfollowedPosts(){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afAuth.user.subscribe(currentUser => {
        if(currentUser){
          this.snapshotChangesSubscription = 
          this.afs.collection('posts', ref=> ref
          .where("userFollowing", "array-contains", currentUser.uid
          ).orderBy("date", "desc")).snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      })
    })
  }
 
 
 


  getPost(postId){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if(currentUser){
          this.snapshotChangesSubscription = this.afs.doc<any>('posts/' + postId).valueChanges()
          .subscribe(snapshots => {
            resolve(snapshots);
          }, err => {
            reject(err)
          })
        }
      })
    });
  }

  getObjectById(id) { 
    return this.afs.collection('posts/').doc(id).valueChanges()
}


  unsubscribeOnLogOut(){
    //remember to unsubscribe from the snapshotChanges
    this.snapshotChangesSubscription.unsubscribe();
  }

  updatePost(postKey, value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      // this.afs.collection('people').doc(currentUser.uid)
      this.afs.collection('posts').doc(postKey).update(value)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  deletePost(postKey){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      // this.afs.collection('people').doc(currentUser.uid).
      this.afs.collection('posts').doc(postKey).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  createPost(value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;  
      this.afs.collection('posts')
      .add({
        comments: value.comments,
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
    })
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  uploadImage(imageURI, randomId){
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child(randomId);
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          snapshot.ref.getDownloadURL()
          .then(res => resolve(res))
        }, err => {
          reject(err);
        })
      })
    })
  }
}


 /* this.afs.collection('people').doc(peopleId).collection('tasks')
      .add({ category: value.category,
        title: value.title,
        description: value.description,
        image: value.image,
        uid: currentUser.uid }) */

