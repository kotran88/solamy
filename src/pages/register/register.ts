import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';

import { RegisterAuthPage } from '../register-auth/register-auth';
import { TermPage } from '../term/term';

// common 
import { AppmgrProvider } from '../../providers/appmgr/appmgr';
import { HttpProvider } from '../../providers/http/http';
import { CommonProvider } from '../../providers/common/common';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  agreeTerm = false;
  mem_type = 0;
  email = '';
  password = '';
  repassword = '';

  validateFlag = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    private appmgr: AppmgrProvider,
    public common: CommonProvider,
    public http: HttpProvider
  ) {
  }

  ionViewWillEnter() {
    let saveInfo = this.appmgr.getSaveInfo();
    this.mem_type = saveInfo.mem_type;
    
    this.agreeTerm = false;
    this.mem_type = 0;
    this.email = '';
    this.password = '';
    this.repassword = '';
    this.validateFlag = false;
  }

  back() {
    this.navCtrl.pop({animate:false});
  }
  /////////
  checkEmail() {
    
    let sendData = [];
        sendData["email"] = this.email;
        sendData["password"] = '';
    this.http.postHttpData("/checkUser", sendData, (result) => {

      if(result) {
        this.validateFlag = true;
        let str = '이미 사용중인 이메일입니다.';
        this.confirmAlert(str);
      }else {
        this.validateFlag = false;
      }
    });
  }
  createUser() {
    // 
    
    if( !this.validate() ) {
      return false;
    }
    
    let sendData = [];
        sendData["email"] = this.email;
    this.http.postHttpData("/sendAuthKey", sendData, (result) => 
    {
      console.log(result);
      if(result) {
        this.navCtrl.push(RegisterAuthPage, { email: this.email, password: this.password, authKey: result }, {animate:false} );
      }
    });

  }
  /////////
  personal() {
    this.navCtrl.push(TermPage, { type:"personal" },{animate:false} );
  }
  term(){
    this.navCtrl.push(TermPage, { type:"term" },{animate:false} );
  }
  
  validate () {
    let str = '';
    if( this.email == '' ) {
      str = '이메일주소를 입력하세요.';
      this.confirmAlert(str);
      return false;
    }
    else if(this.email.indexOf('@') == -1) {
      str = '이메일 형식이 올바르지 않습니다.';
      this.confirmAlert(str);
      return false;
    }
    // 
    if( this.validateFlag ) {
      str = '이미 사용중인 이메일입니다.';
      this.confirmAlert(str);
      return false;
    }
    
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
    // term
    if( this.agreeTerm == false ) {
      str = '이용약관 및 개인정보 수집에 <br/ >동의하셔야 합니다.';
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
