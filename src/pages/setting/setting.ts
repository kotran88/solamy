import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { NaverLogin } from 'naver-login';
import { KakaoCordovaSDK, AuthTypes } from 'kakao-sdk';
// pages
import { ResetPasswordPage } from '../reset-password/reset-password';
import { TermPage } from '../term/term';
import { HomePage } from '../home/home';
// common 
import { AppmgrProvider } from '../../providers/appmgr/appmgr';
import { HttpProvider } from '../../providers/http/http';
import { CommonProvider } from '../../providers/common/common';
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  user_id = 0;
  login_type = '';
  login_flag = false;
  push_flag = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,
    // common
    private appmgr: AppmgrProvider,
    public common: CommonProvider,
    public http: HttpProvider,
    private naver: NaverLogin,
    public kakaoCordovaSDK: KakaoCordovaSDK
  ) {
  }

  ionViewWillEnter() {
    let userInfo = this.appmgr.getUserInfo();
    this.user_id = userInfo.user_id;
    this.login_type = userInfo.login_type;
    this.push_flag = this.intToBool(userInfo.push_flag);
    
    if(userInfo.login_flag == 1) {
      this.login_flag = true;
    }else {
      this.login_flag = false;
    }
  }

  back() {
    this.navCtrl.pop({animate:false});
  }
  resetPass() {
    this.navCtrl.push(ResetPasswordPage, {},{animate:false} );
  }
  term() {
    this.navCtrl.push(TermPage, { type:"term" },{animate:false} );
  }
  personal() {
    this.navCtrl.push(TermPage, { type:"personal" },{animate:false} );
  }

  logout() {
    let userData = {
      user_id : 0,
      name : "",
      email : "",
      login_type : '',
      mem_type : 0,
      login_flag : 0,
     // 
     push_flag: 1,
      status: 1,
      address: '',
      contact: '',
      month_fee: 0
    }
    this.appmgr.setUserInfoAll(userData);
    if(this.login_type == 'naver') {
      this.naver.logout();
    }
    else if(this.login_type == 'kakao') {
      this.kakaoCordovaSDK.logout();
    }
    this.navCtrl.setRoot(HomePage, { },{animate:false} );
  }

  pushChange() {

    let sendData = [];
        sendData["field"] = 'push_flag';
        sendData["value"] = this.boolToInt(this.push_flag);
        sendData["user_id"] = this.user_id;
    this.http.postHttpData("/updatePushFlag", sendData, (result) => {
      if(result) {
        let userData = {
          push_flag : this.push_flag
        }
        this.appmgr.setUserInfoIndivial(userData);
      }
    });
  }

  memberExit() {
    let alert = this.alertCtrl.create({      
      subTitle: '회원탈퇴하시면 회원정보 및 서비스 <br/>이용기록은 모두 삭제되며, <br/>삭제된 데이터는 복구되지 않습니다.',
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
              let sendData = [];
                  sendData["user_id"] = this.user_id;
              this.http.postHttpData("/deleteUser", sendData, (result) => {
                if(result) {
                  this.logout();
                  this.navCtrl.setRoot(HomePage, { login_status: false },{animate:false} );
                }
              });
            }
          }
      ]
    });
    alert.present({animate:false});
  }

  boolToInt (value) {
    if(value) {
      return 1;
    }else {
      return 0;
    }
  }
  intToBool (value) {
    if(value) {
      return true;
    }else {
      return false;
    }
  }

  isEmail() {
    if(this.login_type == 'email') {
      return true;
    }
    else return false;
  }
}
