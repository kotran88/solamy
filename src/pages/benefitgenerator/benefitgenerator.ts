import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpProvider } from '../../providers/http/http';
/**
 * Generated class for the GovernmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-benefitgenerator',
  templateUrl: 'benefitgenerator.html',
})
export class BenefitgeneratorPage {

  email:any;
  name:any;
  tel:any;

  constructor(public http:HttpProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GovernmentPage');
  }

  back() {
    this.navCtrl.pop({animate:false});
  }

  consulting(){
    let sendData = [];
        sendData["email"] = this.email;
        sendData["name"] = this.name;
        sendData["contact"] = this.tel;
        sendData["division"] = "수익형 발전소"
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