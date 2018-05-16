import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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
  constructor(public navCtrl: NavController) {
    this.logPage = "LoginPage";
  }

}
