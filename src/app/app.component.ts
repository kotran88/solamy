import { Component, ViewChild } from '@angular/core';
import { App, NavController, AlertController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
// import { ServiceIntroPage } from '../pages/service-intro/service-intro';
import { FirstPage } from '../pages/first/first';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = FirstPage;
  @ViewChild('rootNav') navCtrl: NavController;

  constructor(
    private app: App,
    public platform: Platform,        
    public alertCtrl: AlertController,
    // splashScreen: SplashScreen,
    statusBar: StatusBar) 
  {
    this.platform.ready().then(() => {
        if(this.platform.is('android') || this.platform.is('ios')) {
            statusBar.styleDefault();
            // splashScreen.hide();
            
            this.platform.registerBackButtonAction(() => {
                const overlay = this.app._appRoot._overlayPortal.getActive();
                const modallay = this.app._appRoot._modalPortal.getActive();
                if(overlay && overlay.dismiss) {
                    overlay.dismiss({}, "", {animate:false});
                } else if(modallay && modallay.dismiss) {
                    modallay.dismiss({}, "", {animate:false});
                } else if(this.navCtrl.canGoBack()){
                    this.navCtrl.pop({animate:false});
                } else {
                  if( this.navCtrl.getActive().component !== HomePage) {
                      this.app.getActiveNav().pop();
                  }
                  else {
                    let alert1 = this.alertCtrl.create({      
                      subTitle: '앱을 종료하시겠습니까?',
                      buttons: [
                          {
                              text: '취소',
                              cssClass: 'cancel',
                              handler: data => {
                                  // console.log("Cancel...", id);
                              }
                          },
                          {
                              text: '확인',
                              cssClass: 'confirm',
                              handler: data => {
                                  this.platform.exitApp();
                              }
                          }
                      ]
                    });
                    alert1.present({animate:false});
                  }
                }
            }, 1);
        }
    });
  }
}