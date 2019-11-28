import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FollowProjectDetailsPage } from './follow-project-details.page';

const routes: Routes = [
  {
    path: '',
    component: FollowProjectDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FollowProjectDetailsPage]
})
export class FollowProjectDetailsPageModule {}
