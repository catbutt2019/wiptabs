import { Component, OnInit } from '@angular/core';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, ToastController, AlertController, NavController } from '@ionic/angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowProjectService } from '../services/follow-project.service';

@Component({
  selector: 'app-follow-projects',
  templateUrl: './follow-projects.page.html',
  styleUrls: ['./follow-projects.page.scss'],
})
export class FollowProjectsPage implements OnInit {

  validations_form: FormGroup;
  image: any =[];
  public imageLists: any[] = [];
  item: any;
  load: boolean = false;
  category: string;
  state = "closed";

  constructor(
    private imagePicker: ImagePicker,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private followProjectsService: FollowProjectService,
    private webview: WebView,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController
  ) { 
    this.route.params.subscribe(params=> {
      this.followProjectsService.getObjectById(params['data']).subscribe( i => {
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
       console.log(data)
       this.item = data;
       this.image = this.item.image;   
     }
    
    })
    this.validations_form = this.formBuilder.group({
      title: new FormControl(this.item.title),
      description: new FormControl(this.item.description),
      category: new FormControl(this.item.category),
    });  
  }

}
