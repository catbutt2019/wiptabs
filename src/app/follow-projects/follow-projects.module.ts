import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FollowProjectsPage } from './follow-projects.page';
import { FollowProjectsResolver } from './follow-projects.resolver';


const routes: Routes = [
  {
    path: '',
    component: FollowProjectsPage,
    resolve: {
      data: FollowProjectsResolver
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
  declarations: [FollowProjectsPage],
  providers:[FollowProjectsResolver]
})
export class FollowProjectsPageModule {}
