import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
// common 
import { AppmgrProvider } from '../../providers/appmgr/appmgr';
import { HttpProvider } from '../../providers/http/http';
import { CommonProvider } from '../../providers/common/common';

@Component({
  selector: 'page-register-auth',
  templateUrl: 'register-auth.html',
})
export class RegisterAuthPage {
  time = '3:00';
  authKey = '';
  inputAuthKey = '';
  email = '';
  password = '';
  mem_type = 0;
  // 
  min = 0;
  sec = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    private appmgr: AppmgrProvider,
    public common: CommonProvider,
    public http: HttpProvider) 
  {
    this.email = navParams.get('email');
    this.password = navParams.get('password');
    this.authKey = navParams.get('authKey');
  }

  ionViewWillEnter() {
    let saveInfo = this.appmgr.getSaveInfo();
    this.mem_type = saveInfo.mem_type;
    this.countDown();
  }

  back() {
    this.navCtrl.pop({animate:false});
  }

  getAuth() {
    
    let str = '';
    if( this.inputAuthKey == '' ) {
      str = '인증번호를 입력하세요.';
      this.confirmAlert(str);
      return false;
    }
    else if( this.authKey != this.inputAuthKey ) {
      str = '인증번호가 올바르지 않습니다.';
      this.confirmAlert(str);
      return false;
    }

    let sendData = [];
        sendData["email"] = this.email;
        sendData["password"] = this.password;
        sendData["type"] = this.mem_type;
        sendData["login_type"] = 'email';
    this.http.postHttpData("/registerUser", sendData, (result) => {
      if(result) 
      {
          
        let saveData = {
          email: '',
          password: '',
          mem_type: this.mem_type
        }
        this.appmgr.setSaveInfo( saveData );

        let userData = {
          email: this.email,
          user_id: result,
          mem_type: this.mem_type,
          login_flag: 1
        }
        this.appmgr.setUserInfoIndivial(userData);
        this.navCtrl.setRoot(HomePage, { },{animate:false} );
      }
    });

  }
  
  resendAuth() {

    console.log(this.inputAuthKey);
    this.inputAuthKey="";
    console.log(this.inputAuthKey);
    this.min = 2;
    this.sec = 59;
    let sendData = [];
        sendData["email"] = this.email;
    this.http.postHttpData("/sendAuthKey", sendData, (result) => 
    {
      if(result) {
        this.authKey = result;
        this.countDown();
        
        let str = '인증번호가 다시 발송 되었습니다.';
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

  countDown() {
    this.min = 2;
    this.sec = 59;
    let tmpmin, tmpsec :any;
    let loop = setInterval( ()=>{
      this.sec--;
      tmpmin = this.min < 10 ? '0'+this.min : this.min;
      tmpsec = this.sec < 10 ? '0'+this.sec : this.sec;
      this.time = tmpmin + ':' + tmpsec;
      if(this.min == 0 && this.sec == 0) {
        this.min = 2;
        this.sec = 59;
        this.authKey = '';
        clearInterval(loop);
      }
      if(this.sec == 0) {
        this.sec = 59;
        this.min--;
      }
    }, 1000);
  }
}
