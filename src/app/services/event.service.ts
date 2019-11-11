import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { AuthenticateService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public eventListRef: firebase.firestore.CollectionReference;

  constructor(private authService: AuthenticateService) { }

   async getEventList(): Promise<firebase.firestore.QuerySnapshot> {
    const user: firebase.User = await this.authService.getUser();
    if (user) 
          {
    this.eventListRef = firebase
      .firestore()
      .collection(`posts`);
    return this.eventListRef.where('category', '==', 'Wipped').where('uid', '==', user.uid).get();
              }
           } 
       }