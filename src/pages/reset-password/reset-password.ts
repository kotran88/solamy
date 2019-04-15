import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';

// common 
import { AppmgrProvider } from '../../providers/appmgr/appmgr';
import { HttpProvider } from '../../providers/http/http';
import { CommonProvider } from '../../providers/common/common';
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  email = '';
  password = '';
  repassword = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,
    // common
    private appmgr: AppmgrProvider,
    public common: CommonProvider,
    public http: HttpProvider) {
  }

  ionViewWillEnter() {
    let userInfo = this.appmgr.getUserInfo();
    this.email = userInfo.email;
  }

  back() {
    this.navCtrl.pop({animate:false});
  }
  
  reset() {

    if( !this.validate() ) {
      return false;
    }
    let sendData = [];
        sendData["password"] = this.password;
        sendData["email"] = this.email;
    this.http.postHttpData("/updatePassword", sendData, (result) => {
      if(result) {
        this.navCtrl.push(HomePage, {},{animate:false} );
      }
    });
  }
  
  validate () {
    let str = '';
    // password
    if( this.password == '' ) {
      str = '비밀번호를 입력하세요.';
      this.confirmAlert(str);
      return false;
    }
    else if( this.password != this.repassword ) {
      str = '비밀번호가 일치하지 않습니다.';
      this.confirmAlert(str);
      return false;
    }
    else if( this.password.length < 8 ) {
      str = '비밀번호 형식이 올바르지 않습니다.';
      this.confirmAlert(str);
      return false;
    }
    return true;
  }

  confirmAlert(str) {
    let alert = this.alertCtrl.create({      
        subTitle: str,
        buttons: ['확인']
    });
    alert.present({animate:false});
  }
}
