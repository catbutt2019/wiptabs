import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { EventService } from '../services/event.service';
import { ProfileService } from  '../services/profile.service';

@Injectable()
export class FollowProjectsResolver implements Resolve<any> {

  constructor(
    private firebaseService: FirebaseService,
    private eventService: EventService,
    private profileService: ProfileService
    ) {}

  resolve() {
    return this.firebaseService.getfollowedPosts();
  }

}
