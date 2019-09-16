import { Component, OnInit,ViewChild  } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { EventService } from '../services/event.service';



@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  
  @ViewChild('slides') slider: IonSlides;

  segment = 0; 

  userEmail: string;
  items: Array<any>;
  public eventList: Array<any>;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    public loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}
 
  ngOnInit(){

    this.eventService.getEventList().then(eventListSnapshot => {
      this.eventList = [];
      eventListSnapshot.forEach(snap => {
        this.eventList.push({
          id: snap.id,
         title: snap.data().title,
         description: snap.data().description,
         image: snap.data().image
        });
        return false;
      });
    });



    
    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
    }else{
      this.navCtrl.navigateBack('');
    }

    if (this.route && this.route.data) {
      this.getData();
    }
  }

  //this is for the segments to slide 
  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }


  async getData(){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    this.route.data.subscribe(routeData => {
      routeData['data'].subscribe(data => {
        loading.dismiss();
        this.items = data;
      })
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }
 
  logout(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    })
  }
}