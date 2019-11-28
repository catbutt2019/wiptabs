import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FollowProjectService {

  private snapshotChangesSubscription: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) { 
    
  }



getfollowedProjects(){
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




getfollowedProject(postId){
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



}