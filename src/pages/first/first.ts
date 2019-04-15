import { Component } from '@angular/core';
import { NavController, NavParams, Platform, Events } from 'ionic-angular';


import { HomePage } from '../home/home';
import { ServiceIntroPage } from '../service-intro/service-intro';
// common 
import { AppmgrProvider } from '../../providers/appmgr/appmgr';

@Component({
  selector: 'page-first',
  templateUrl: 'first.html',
})
export class FirstPage {
  reRead  = 1;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private platform : Platform, 
    private appmgr: AppmgrProvider,  
    public event : Events) {
    
    // this.event.unsubscribe("get_sqlite_data");
    // this.event.subscribe("get_sqlite_data", (userInfo) => {
    //     this.reRead = userInfo.service_intro;
    //     if( this.reRead == 0 ) {
    //       this.navCtrl.setRoot(HomePage, {},{animate:false} );
    //     }
    //     else {
    //       this.navCtrl.setRoot(ServiceIntroPage, {},{animate:false} );
    //     }
    // });
    this.navCtrl.setRoot(HomePage, {},{animate:false} );
  }

  ionViewWillEnter() {        
    
    // let userInfo = this.appmgr.getUserInfo();
    // this.reRead = userInfo.service_intro;
  }

}
