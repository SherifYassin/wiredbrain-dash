import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { IonicStorageModule } from '@ionic/storage';
import { RewardServiceProvider } from '../providers/reward-service/reward-service';

import { RewardModalPageModule } from '../pages/reward-modal/reward-modal.module';

/* export const firebaseConfig = {
  apiKey: "AIzaSyA5EjI5f5D_Fvada3QD0NaQb_Oir81hovo",
  authDomain: "wired-brain-dashboard.firebaseapp.com",
  databaseURL: "http://wired-brain-dashboard.firebasio.com",
  storageBucket: "wired-brain-dashboard.appspot.com",
  messagingSenderId: "970805425096"
}; */

export const firebaseConfig = {
  apiKey: "##############################################",
  authDomain: "##############################################",
  databaseURL: "##############################################",
  projectId: "##############################################",
  storageBucket: "##############################################",
  messagingSenderId: "##############################################"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    RewardModalPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    RewardServiceProvider
  ]
})
export class AppModule {}
