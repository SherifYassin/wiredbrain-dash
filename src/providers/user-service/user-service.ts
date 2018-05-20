import { AngularFireAuth } from "angularfire2/auth";
import firebase from "firebase/app";
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  items: AngularFireList<any>;
  success: boolean;

  constructor(public alerCtrl: AlertController, public afAuth: AngularFireAuth,
    private storage: Storage, private fbDb: AngularFireDatabase) {
    this.items = fbDb.list('/users');
  }

  displayAlert(alertTitle,alertSub){
    let theAlert = this.alerCtrl.create({
      title: alertTitle,
      subTitle: alertSub,
      buttons: ['OK']
    });
    theAlert.present();
  }

  logOut(){
    this.storageControl('delete');
    this.afAuth.auth.signOut()
      .then(LogedOut => this.displayAlert("Logged Out","Come Back and visit soon"))
      .catch(err => this.displayAlert("Error",err));
  }

  storageControl(action, key?, value?){
    if(action == 'set'){
      this.storage.set(key,value);
    }
    if(action == 'get'){
      return this.storage.get(key);
    }
    if(action == 'delete'){
      if(!key){
        this.displayAlert('Wraning', 'About to delete all user data');
        this.storage.clear().
        then(res => this.displayAlert('Clear','All data was cleared successfully')).
        catch(err => this.displayAlert("Error",err));
      }
      else{
        this.displayAlert(key, 'About to delete this data');
        this.storage.remove(key).
        then(res => this.displayAlert(key,'This data was removed successfully')).
        catch(err => this.displayAlert("Error",err));
      }
    }
  }
  saveNewUser(user){
    let userObj = {
      creation: new Date().toDateString(),
      logins: 1,
      rewardCount: 0,
      lastLogin: new Date().toLocaleString(),
      id: ''
    }
    this.items.push({
      username: user,
      creation: userObj.creation,
      logins: userObj.logins,
      rewardCount: userObj.rewardCount,
      lastLogin: userObj.lastLogin
    })
    .then(res => {
      userObj.id = res.key;
      return this.storageControl('set', user, userObj);
    });
    return this.storageControl('get', user);
  }

  updateUser(theUser, theUserData){
    let newData= {
      creation: theUserData.creation,
      logins: theUserData.logins + 1,
      rewardCount: theUserData.rewardCount,
      lastLogin: new Date().toLocaleString(),
      id: theUserData.id
    }
    this.items.update(newData.id, {
      logins: newData.logins,
      rewardCount: newData.rewardCount,
      lastLogin: newData.lastLogin
    });
    this.storageControl('set', theUser, newData);
  }

  logOn(user, password){
    return this.afAuth.auth.signInWithEmailAndPassword(user, password)
      .then(res => {
        this.storageControl('get',user)
        .then(retruned => {
          if(!retruned){
           this.saveNewUser(user).
            then(result => this.displayAlert(user,'New account saved for this user'));
         }
          else{
           this.updateUser(user,retruned);
         }
        })
        this.success = true;
        return res;
      })
      .catch(err => {
        this.success = false;
        this.displayAlert('Error Logging In', err);
        return err;
      });
  }
}
