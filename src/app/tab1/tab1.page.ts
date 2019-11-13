import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, ToastController, Platform, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FirebaseService } from '../services/firebase.service';
import 'firebase/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ProfileService } from '../services/profile.service';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {


  sliderOpts= {
    zoom: false,
    slidesPerView: 1.2,
    centeredSlides: true,
    spaceBetween: 20
  };
  
  title: string;
  profileImage : string;
  userName: any;
  userBio: string;
  userDetails: any;
  isVisible = true;
  item: any

  validations_form: FormGroup;
  image : any =[];
  category: string;
  students: {
     id: string; 
     isEdit: boolean; 
     userName: any; 
     userBio: any; 
     profileImage: any; }[];

  constructor(
    private imagePicker: ImagePicker,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public router: Router,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private webview: WebView,
    public camera: Camera,
    public platform: Platform,
    public actionSheetController: ActionSheetController,
    private file: File,
    private profileService: ProfileService

  ) { }

  ngOnInit() {
    
    this.category = '';
    this.resetFields();
    this.profileService.read_Students().subscribe(data => {
 
      this.students = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          userName: e.payload.doc.data()['userName'],
          userBio: e.payload.doc.data()['userBio'],
          profileImage: e.payload.doc.data()['profileImage'],
        };
      })
      console.log(this.students);
 
    });
    
  }
  resetFields() {
   this.image = [];
   this.category ='';
    this.validations_form = this.formBuilder.group({
      description: new FormControl('', Validators.required),   
      userName: new FormControl(this.userName),
      profileImage: new FormControl(this.profileImage)
      // profileImage: new FormControl(this.profileImage)
    });
  }

  newProject() {
    this.category = 'Wipping';
    console.log(this.category)
  }



  completeProject() {
    this.category = 'Wipped';
    console.log(this.category)
  }

  backtocategory() {
    this.category = '';
  }
     

  UpdateRecord(recordRow) {
    let record = {};
    record['userName'] = recordRow.userName || "" ;
    record['profileImage'] = this.profileImage || ""; 
    record['userBio'] = recordRow.userBio || "" ;
    this.profileService.update_Student(recordRow.id, record);
    recordRow.isEdit = false;
  }

  onSubmit(value){
    //make button dissapear 
    let data = {
      userName : value.userName || "", 
      description: value.description,
      profileImage: value.profileImage,
      title: this.title,
      image: this.image,
      category: this.category
    }
    this.firebaseService.createPost(data)
    .then(
      res => {
        this.router.navigate(["/tabs/tab4"]);
      }
    ).then(
      res => {
       // "./assets/imgs/shane2.jpg"
      
        this.title =''
        this.image = [];
        this.category = '';
       
        this.validations_form = this.formBuilder.group({
          description: new FormControl('', Validators.required),
          profileImage: new FormControl(this.profileImage),
          userName: new FormControl(this.userName),
      
        });

        this.image =  [];
        this.profileService.read_Students().subscribe(data => {
 
          this.students = data.map(e => {
            return {
              id: e.payload.doc.id,
              isEdit: false,
              userName: e.payload.doc.data()['userName'],
              userBio: e.payload.doc.data()['userBio'],
              profileImage: e.payload.doc.data()['profileImage'],
            };
          })
          console.log(this.students);
     
        });
        this.resetFields();
        //make button repear 
      }
    )
  }


 /*  resetFields(){
    this.image = "./assets/imgs/default_image.jpg";
    
    this.validations_form = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
      
    });
  } */

  


  //"./assets/imgs/default_image.jpg"
 resetForm() {
    this.image = [];
  
    this.validations_form.reset();
    this.validations_form.setValue({
      
      title: '',
      description: 'ddd'
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


  async uploadImageToFirebaseCamera(image){

    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    const toast = await this.toastCtrl.create({
      message: 'Image was updated successfully',
      duration: 3000
    });
    this.presentLoading(loading);
    let image_src = this.webview.convertFileSrc(image);
    let randomId = Math.random().toString(36).substr(2, 5);

    //uploads img to firebase storage
    this.firebaseService.uploadImage(image_src, randomId)
    .then(photoURL => {
     
      this.image = [photoURL];
      loading.dismiss();
      toast.present();
    }, err =>{
      console.log(err);
    })
  }

  openImagePicker(){
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

 

async takePicture() {

  const options: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  };

  this.camera.getPicture(options)
  .then((imageData) => {
    this.image = 'data:image/jpeg;base64,' + imageData;
    this.uploadImageToFirebaseCamera('data:image/jpeg;base64,' + imageData );        
  }, (err) => {`              `
    // Handle error
    console.log("Camera issue:" + err);
    });
  }

  async presentLoading(loading) {
    return await loading.present();
  }
  
}


/* 
takePhoto () {

     
  const options: CameraOptions = {
    quality: 60,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

 
  const result = this.camera.getPicture(options);

  const image = `data:image/jpeg;base64,${result}`;


  const pictures = storage().ref('pictures');
  pictures.putString(image, 'data_url');


} */
   

