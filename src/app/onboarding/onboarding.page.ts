import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {


  sliderOpts= {
    zoom: false,
    slidesPerView: 1.2,
    centeredSlides: true,
    spaceBetween: 20,
    pager: true
  };

  nextOptions: string;
  image : any = [];

  constructor(
    public navCtrl: NavController
  ) { }

  

  ngOnInit() {

    this.image= ["./assets/imgs/shane2.jpg", "./assets/imgs/shane2.jpg"]
  }

  start() {
    this.navCtrl.navigateForward('tabs/edit-profile')
  }

}
