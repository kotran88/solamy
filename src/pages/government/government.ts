import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpProvider } from '../../providers/http/http';
import { AppmgrProvider } from '../../providers/appmgr/appmgr';
/**
 * Generated class for the GovernmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-government',
  templateUrl: 'government.html',
})
export class GovernmentPage {

  email:any;
  name:any;
  tel:any;
  userInfo:any;
  constructor(public http:HttpProvider,private appmgr: AppmgrProvider,public navCtrl: NavController, public navParams: NavParams) {

    this.userInfo  = this.appmgr.getUserInfo();
    console.log(this.userInfo);
  }

  back() {
    this.navCtrl.pop({animate:false});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GovernmentPage');
  }
  consulting(){
    let sendData = [];
        sendData["email"] = this.email;
        sendData["name"] = this.name;
        sendData["contact"] = this.tel;
        sendData["division"] = "태양광정부지원"
        console.log(sendData);
    this.http.postHttpData("/requestGovernmentInquiry", sendData, (result) => 
    {
      console.log(result);
      if(result=="ok") 
      {
        window.alert("상담이 요청되었습니다")
      }
    });

  }

}
