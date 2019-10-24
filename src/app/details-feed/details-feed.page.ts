import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-details-feed',
  templateUrl: './details-feed.page.html',
  styleUrls: ['./details-feed.page.scss'],
})
export class DetailsFeedPage implements OnInit {

  image: any;
  public imageLists: any[] = [];
  item: any;
  load: boolean = false;
  category: string;

  constructor(
    private imagePicker: ImagePicker,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private webview: WebView,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController
  ) { 
    this.route.params.subscribe(params=> {
      this.firebaseService.getObjectById(params['data']).subscribe( i => {
        this.item = i;
                   })
             });
  }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.route.data.subscribe(routeData => {
     let data = routeData['data'];
     if (data) {
       this.item = data;
       this.image = this.item.image;   
     }
    })   
  }

  navigateBack() {
    this.navCtrl.back();
  }

}
