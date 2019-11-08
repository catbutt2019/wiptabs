import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetailsWippedPage } from './details-wipped.page';
import { DetailsWippedResolver } from './details-wipped.resolver';

const routes: Routes = [
  {
    path: '',
    component: DetailsWippedPage,
    resolve: {
      data: DetailsWippedResolver
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
  declarations: [DetailsWippedPage],
  providers:[DetailsWippedResolver]
})

export class DetailsWippedPageModule {}
