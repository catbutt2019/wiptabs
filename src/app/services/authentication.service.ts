import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';

@Injectable()
export class AuthenticateService {

  constructor(){}

  getUser(): Promise<firebase.User> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(
        user => {
          if (user) {
            resolve(user);
          } else {
            reject(null);
          }
        },
        error => {
          reject(error);
        }
      );
    });
  }

  registerUser(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }

  loginUser(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }

  logoutUser(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        firebase.auth().signOut()
        .then(() => {
          console.log("LOG Out");
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }

  userDetails(){
    return firebase.auth().currentUser;
  }
}