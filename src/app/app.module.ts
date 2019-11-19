import { NgModule, OnInit } from '@angular/core';
import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticateService } from './services/authentication.service';
// import { NewTaskModalPage } from './new-task-modal/new-task-modal.page';

import { Camera} from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireFunctionsModule, FunctionsRegionToken } from '@angular/fire/functions'

@NgModule({
  declarations: [AppComponent],
  // declarations: [AppComponent, NewTaskModalPage],
  // entryComponents: [NewTaskModalPage],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule, //animations
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app
    AngularFirestoreModule, // imports firebase/firestore
    AngularFireAuthModule, // imports firebase/auth
    AngularFireStorageModule, // imports firebase/storage
    AngularFireFunctionsModule,
  ],
  providers: [
    Camera,
    File,
    StatusBar,
    SplashScreen,
    ImagePicker,
    AuthenticateService,
    { provide: FunctionsRegionToken, useValue: 'us-central1' },
    WebView,
    { provide: FirestoreSettingsToken, useValue: {} },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig},
 
  ],
  bootstrap: [AppComponent]
})
export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    'press': {time: 500},  // default: 251 ms
    'pinch': {enable: false},
    'rotate': {enable: false},
  };
}
export class AppModule {}

