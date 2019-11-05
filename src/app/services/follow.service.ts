import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private db: AngularFirestore) { }

  getFollowers(userId: string) {
    // Used to build the follower count
    return this.db.doc(`followers/${userId}`)
  }

  getFollowing(followerId:string, followedId:string) {
    // Used to see if UserFoo if following UserBar
    return this.db.doc(`following/${followerId}/${followedId}`)
  }

  follow(followerId: string, followedId: string) {
    this.db.doc(`followers/${followedId}`).update({ [followerId]: true } )
    this.db.doc(`following/${followerId}`).update({ [followedId]: true } )
  }

  unfollow(followerId: string, followedId: string) {
    this.db.doc(`followers/${followedId}/${followerId}`).delete()
    this.db.doc(`following/${followerId}/${followedId}`).delete()
  }

}
