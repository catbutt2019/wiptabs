import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FollowProjectDetailsPage } from './follow-project-details.page';
import { DetailsFeedResolver } from '../details-feed/details-feed.resolver';


const routes: Routes = [
  {
    path: '',
    component: FollowProjectDetailsPage,
    resolve: {
      data: DetailsFeedResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FollowProjectDetailsPage],
  providers:[DetailsFeedResolver]
})
export class FollowProjectDetailsPageModule {}
