import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  create_NewStudent(record) {
    return this.firestore.collection('Students').add(record);
  }
 
  read_Students() {
    return this.firestore.collection('Students').snapshotChanges();
  }
 
}
