import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';

// common 
import { HttpProvider } from '../../providers/http/http';
import { CommonProvider } from '../../providers/common/common';

@Component({
  selector: 'page-find-pass',
  templateUrl: 'find-pass.html',
})
export class FindPassPage {
  email = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public common: CommonProvider,
    public http: HttpProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindPassPage');
  }

  back() {
    this.navCtrl.pop({animate:false});
  }
  sendMail() {
    let str = '';
    if( this.email == '' ) {
      str = '이메일주소를 입력하세요.';
      this.confirmAlert(str);
      return;
    }
    else if(this.email.indexOf('@') == -1) {
      str = '이메일 형식이 올바르지 않습니다.';
      this.confirmAlert(str);
      return;
    }
    let sendData = [];
        sendData["email"] = this.email;
        sendData["password"] = '';
    this.http.postHttpData("/sendPassword", sendData, (result) => {
      console.log("result"+result);
      if(!result) {
        str = '등록되지 않은 계정입니다.';
        this.confirmAlert(str);
      }
      else {
        str = '이메일로 임시비밀번호를 발송했습니다.';
        this.confirmAlert(str);
      }
    });

  }
  
  confirmAlert(str) {
    let alert = this.alertCtrl.create({      
        subTitle: str,
        buttons: ['확인']
    });
    alert.present({animate:false});
  }
}
