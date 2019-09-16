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
    this.eventListRef = firebase
      .firestore()
      .collection(`people/${user.uid}/tasks`);
    return this.eventListRef.where('category', '==', 'Wipping').get();
    } 

}
