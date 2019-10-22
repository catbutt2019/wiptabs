import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetailsFeedPage } from './details-feed.page';
import { DetailsFeedResolver } from './details-feed.resolver';

const routes: Routes = [
  {
    path: '',
    component: DetailsFeedPage,
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
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetailsFeedPage],
  providers:[DetailsFeedResolver]
})
export class DetailsFeedPageModule {}
