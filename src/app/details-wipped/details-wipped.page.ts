import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, ToastController, AlertController, NavController } from '@ionic/angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, transition, animate, style } from '@angular/animations';



@Component({
  selector: 'app-details-wipped',
  templateUrl: './details-wipped.page.html',
  animations: [
    trigger('elementState', [
      state('open', style({
        height: '100%',
        zIndex: 4 ,
        width: '100%',
        backgroundColor: '#ffffff',
        marginTop: '0px',
        position: 'fixed',
        borderRadius: ' 0px 0px 25px 25px', 
        
      })),
      state('closed', style({
        display: 'none',
        zIndex: 4,
        height: '0px',
        backgroundColor: '#ffffff',
        opacity: 0
      })),
      transition('open => closed', animate('10ms ease-in')),
      transition('closed => open', animate('10ms ease-out'))
    ]),
  ],
  styleUrls: ['./details-wipped.page.scss'],
})
export class DetailsWippedPage implements OnInit {

  validations_form: FormGroup;
  image: any;
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
    private firebaseService: FirebaseService,
    private webview: WebView,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController
  ) {

    //
    //this gets the data of the object id from firestore
    this.route.params.subscribe(params=> {
      this.firebaseService.getObjectById(params['id']).subscribe( i => {
        this.item = i;
                   })
             });
       }

  ngOnInit() {
    this.getData();
    
  }

  editOpen() {
    this.state = "open";
  }

  editClosed() {
    this.state = "closed";
  }

  editText() {
    this.state = "closed";
  }

  editTextClosed() {
    this.state = "textEditClosed";
  }

  makeWipped() {
    this.category ="wipped"
  }

  navigateBack() {
    this.navCtrl.back();
  }

  getData(){
    this.route.data.subscribe(routeData => {
     let data = routeData['data'];
     if (data) {
       this.item = data;
       this.image = this.item.image;   
     }
    })
    this.validations_form = this.formBuilder.group({
      title: new FormControl(this.item.title, Validators.required),
      description: new FormControl(this.item.description, Validators.required),
      category: new FormControl(this.item.category, Validators.required)
    });

    
  }

  onSubmit(value){
    let data = {
      title: value.title,
      description: value.description,
      image: this.image,
      category: value.category
    }
    this.firebaseService.updatePost(this.item.id,data)
    .then(
      res => {
        this.router.navigate(["/tabs/tab4"]);
      }
    )
  }

  async delete() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm',
      message: 'Do you want to delete ' + this.item.title + '?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        },
        {
          text: 'Yes',
          handler: () => {
            this.firebaseService.deletePost(this.item.id)
            .then(
              res => {
                this.router.navigate(["/tabs/tab4"]);
              },
              err => console.log(err)
            )
          }
        }
      ]
    });
    await alert.present();
  }

  openImagePicker(){
    this.state = "closed";
    this.imagePicker.hasReadPermission()
    .then((result) => {
      if(result == false){
        // no callbacks required as this opens a popup which returns async
        this.imagePicker.requestReadPermission();
      }
      else if(result == true){
        this.imagePicker.getPictures({
          maximumImagesCount: 10
        }).then(
          (results) => {
            for (var i = 0; i < results.length; i++) {
              this.uploadImageToFirebase(results[i]);
            }
          }, (err) => console.log(err)
        );
      }
    }, (err) => {
      console.log(err);
    });
  }

  

  async uploadImageToFirebase(image){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    const toast = await this.toastCtrl.create({
      message: 'Image was updated successfully',
      duration: 3000
    });
    this.presentLoading(loading);
    // let image_to_convert = 'http://localhost:8080/_file_' + image;
    let image_src = this.webview.convertFileSrc(image);
    let randomId = Math.random().toString(36).substr(2, 5);

    //uploads img to firebase storage
    this.firebaseService.uploadImage(image_src, randomId)
    .then(photoURL => {
      this.image.push(photoURL);
      loading.dismiss();
      toast.present();
    }, err =>{
      console.log(err);
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }

}
