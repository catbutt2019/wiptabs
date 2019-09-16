import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Tab4Page } from './tab4.page';
import { HomeResolver } from './home.resolver';
import { WippingResolver } from './wipping.resolver';




const routes: Routes = [
  {
    path: '',
    component: Tab4Page,
    resolve: {
      data: HomeResolver,  WippingResolver 
    
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Tab4Page],
  providers: [
    HomeResolver,
    WippingResolver
  ]
})
export class Tab4PageModule {}
