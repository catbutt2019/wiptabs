import { Component, OnInit,ViewChild  } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { EventService } from '../services/event.service';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { ProfileService } from '../services/profile.service';
import { FirebaseService } from '../services/firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';




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
  public eventListRef: firebase.firestore.CollectionReference;
  profileImage : string;
  userName: string;
  userBio: string;
  userDetails: any;
  students: any;
  studentName: string;
  studentAge: number;
  studentAddress: string;
  data

  constructor(
    private firestore: AngularFirestore,
    private navCtrl: NavController,
    private authService: AuthenticateService,
    public loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService,
    private profileService: ProfileService,
    private firebaseService: FirebaseService,
  ) {}
 
  ngOnInit(){


    
    this.read_Students().subscribe(data => {
 
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




    
    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
    }else{
      this.navCtrl.navigateBack('');
    }

    if (this.route && this.route.data) {
      this.getData();
      
    }
  }

  read_Students() {
    let currentUser = firebase.auth().currentUser;
    return this.firestore.collection('Users').doc(currentUser.uid).collection('userDetails').snapshotChanges();
  }

  //this is for the segments to slide 
  async segmentChanged() {
    await this.slider.slideTo(this.segment);
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
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
    await this.slider.slideTo(this.segment);
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
  }


  async getData(){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    this.route.data.subscribe(routeData => {
      routeData['data'].subscribe(data => {
        console.log(data)
        loading.dismiss();
        this.items = data;
      })
    })
  }


  async getEventList(): Promise<firebase.firestore.QuerySnapshot> {
    const user: firebase.User = await this.authService.getUser();
    this.eventListRef = firebase
      .firestore()
      .collection(`people/${user.uid}/tasks`);
    return this.eventListRef.where('category', '==', 'Wipping').get();
   
    } 



  async presentLoading(loading) {
    return await loading.present();
  }
 
  gotoeditPage() {
    this.navCtrl.navigateForward('tabs/edit-profile')
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