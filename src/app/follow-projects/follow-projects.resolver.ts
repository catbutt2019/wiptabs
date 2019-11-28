import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { FollowProjectService } from '../services/follow-project.service';

@Injectable()
export class FollowProjectsResolver implements Resolve<any> {

  constructor(public followProjectsService: FollowProjectService,) { }

  resolve(route: ActivatedRouteSnapshot) {

    return new Promise((resolve, reject) => {
      let itemId = route.paramMap.get('id');
      this.followProjectsService.getfollowedProject(itemId)
      .then(data => {
        data.id = itemId;
        resolve(data);
      }, err => {
        reject(err);
      })
    })
  }
}