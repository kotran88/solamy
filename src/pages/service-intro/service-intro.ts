import { Component } from '@angular/core';
import { NavController, NavParams, Platform, Events} from 'ionic-angular';

import { HomePage } from '../home/home';
import {DomSanitizer} from '@angular/platform-browser';

import { SplashScreen } from '@ionic-native/splash-screen';
// common 
import { AppmgrProvider } from '../../providers/appmgr/appmgr';
import { AnalyseClientPage } from '../analyse-client/analyse-client';
import { RegisterTypePage } from '../register-type/register-type';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-service-intro',
  templateUrl: 'service-intro.html',
})
export class ServiceIntroPage {
  redirect = false;
  reRead = 1;
  tab = "tab1";
  array=[];
  newarray=[];
  constructor(
    public sanitizer: DomSanitizer,
    public navCtrl: NavController, public navParams: NavParams,
    private splashScreen: SplashScreen,
    private platform : Platform, 
    private appmgr: AppmgrProvider,  
    public event : Events
    
  ) {
      // this.redirect = navParams.get('redirect');
      this.redirect=navParams.get("redirect");
      this.array=navParams.get("array");
      console.log(this.array);
      for(var i=0; i<this.array.length; i++){
        if(this.array[i].rank_flag==1){
          this.newarray.push({"url":this.sanitizer.bypassSecurityTrustResourceUrl(this.array[i].url)})
        }
     
        // this.array[i].url=this.sanitizer.bypassSecurityTrustResourceUrl(this.array[i].url);	
      }
      console.log(this.array);
  }
  registerPage() {
    this.navCtrl.push(RegisterTypePage, {},{animate:false} );
  }
  
  login() {
    this.navCtrl.push(LoginPage, {},{animate:false} );
  }

back(){
  this.navCtrl.pop({animate:false});
}
  ionViewWillEnter() {        
    
    // let userInfo = this.appmgr.getUserInfo();
    // this.reRead = userInfo.service_intro;
    // if( this.reRead == 0 ) {
    //   this.navCtrl.setRoot(HomePage, {},{animate:false} );
    //   return;
    // }
    console.log(this.array);
    if(this.platform.is('android') || this.platform.is('ios')) {
        this.splashScreen.hide();
    }
  }
  notShowAgain() {
    let userData = {
      service_intro : 0
    }
    this.appmgr.setUserInfoIndivial(userData);
    
    this.navCtrl.setRoot(HomePage, {},{animate:false} );
  }
  closeWindow() {
      this.navCtrl.setRoot(HomePage, {},{animate:false} );
  }
  
  isLogin() {
    if(this.redirect == true)
        return true;
    else
        return false;
  }
  anal() {
    this.navCtrl.push(RegisterTypePage, {  },{animate:false} );
  }
  isReRead() {
    if(this.reRead == 1)
        return true;
    else
        return false;
  }
}
