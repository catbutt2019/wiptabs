import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { EventService } from '../services/event.service';

@Injectable()
export class HomeResolver implements Resolve<any> {

  constructor(private firebaseService: FirebaseService, private eventService: EventService) {}

  resolve() {
    return this.firebaseService.getTasks();
    
  }

}
