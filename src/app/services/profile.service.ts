import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  create_NewStudent(record) {
    let currentUser = firebase.auth().currentUser;
    return this.firestore.collection('Users').doc(currentUser.uid).collection('userDetails').add(record);
  }
 
  read_Students() {
    let currentUser = firebase.auth().currentUser;
    return this.firestore.collection('Users').doc(currentUser.uid).collection('userDetails').snapshotChanges();
  }


  update_Student(recordID,record){
    let currentUser = firebase.auth().currentUser;
    this.firestore.collection('Users').doc(currentUser.uid).collection('userDetails').doc(recordID).update(record)
  }

  delete_Student(record_id) {
    let currentUser = firebase.auth().currentUser;
    this.firestore.collection('Users').doc(currentUser.uid).collection('userDetails').doc(record_id).delete();
  }
 
}
