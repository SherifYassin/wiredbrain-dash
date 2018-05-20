import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import firebase from "firebase/app";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  menuData = [
    {title: 'Our Menu', pic: 'assets/imgs/logo.png', pushPage: 'MenuPage'},
    {title: 'Account', pic: 'assets/imgs/account.png', pushPage: 'AccountPage'},
    {title: 'About Us', pic: 'assets/imgs/about-us.png', pushPage: 'AboutUsPage'},
    {title: 'Location', pic: 'assets/imgs/location.png', pushPage: 'LocationPage'}
  ];

  logPage: any;
  loggedIn: any;
  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth,
    private userService: UserServiceProvider) {
    this.logPage = "LoginPage";
    this.afAuth.auth.onAuthStateChanged( user => {
      if(user){
        this.loggedIn = user.email;
      }
    })
  }

  signOff(){
    this.userService.logOut();
    this.loggedIn = '';
  }
}
