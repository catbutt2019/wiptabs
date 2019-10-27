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
import { NavController, ModalController } from '@ionic/angular';
import { ProfileService } from '../services/profile.service'

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  profileImage : string;
  userName: string;
  userBio: string;
  userDetails: any;
  students: any;
  studentName: string;
  studentAge: number;
  studentAddress: string;

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
    private navCtrl: NavController,
    private profileService: ProfileService
  ) { 
    
  }
  //"./assets/imgs/default_image.jpg"
  ngOnInit() {
    this.profileImage =  "./assets/imgs/default_image.jpg"
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

  CreateRecord() {
    let record = {};
    record['profileImage'] = this.profileImage;
    record['userName'] = this.userName;
    record['userBio'] = this.userBio;
    this.profileService.create_NewStudent(record).then(resp => {
      this.studentName = "";
      this.studentAge = undefined;
      this.studentAddress = "";
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

  gobacktoProfile() {
      this.navCtrl.back()
  }


  chooseProfilePic(){
    this.imagePicker.hasReadPermission()
    .then((result) => {
      if(result == false){
        // no callbacks required as this opens a popup which returns async
        this.imagePicker.requestReadPermission();
      }
      else if(result == true){
        this.imagePicker.getPictures({
          maximumImagesCount: 1
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
    let image_src = this.webview.convertFileSrc(image);
    let randomId = Math.random().toString(36).substr(2, 5);

    //uploads img to firebase storage
    this.firebaseService.uploadImage(image_src, randomId)
    .then(photoURL => {
      this.profileImage = photoURL;
      loading.dismiss();
      toast.present();
    }, err =>{
      console.log(err);
    })
  }

  saveChanges() {}

  async presentLoading(loading) {
    return await loading.present();
  }

  }

