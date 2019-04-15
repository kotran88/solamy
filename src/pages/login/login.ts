import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { NaverLogin } from 'naver-login';
import { KakaoCordovaSDK, AuthTypes } from 'kakao-sdk';

// common 
import { AppmgrProvider } from '../../providers/appmgr/appmgr';
import { HttpProvider } from '../../providers/http/http';
import { CommonProvider } from '../../providers/common/common';
// normal
import { HomePage } from '../home/home';
import { RegisterTypePage } from '../register-type/register-type';
import { FindPassPage } from '../find-pass/find-pass';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  saveId = false;
  savePass = false;
  email = '';
  password = '';
  mem_type = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    private appmgr: AppmgrProvider,
    public common: CommonProvider,
    public http: HttpProvider,
    private naver: NaverLogin,
    public kakaoCordovaSDK: KakaoCordovaSDK
  ) {
    // if( navParams.get('mem_type') ) {
    //   this.mem_type = navParams.get('mem_type');  // partners
    // }else {
    //   this.mem_type = 0;  // normal member
    // }
    
  }

  ionViewWillEnter() {
    let saveInfo = this.appmgr.getSaveInfo();
    this.email = saveInfo.email;
    this.password = saveInfo.password;
    if( saveInfo.email != '') {
      this.saveId = true;
    }
    if( saveInfo.password != '') {
      this.savePass = true;
    }
  }
  
  back() {
    this.navCtrl.pop({animate:false});
  }
  registerPage() {
    this.navCtrl.push(RegisterTypePage, {},{animate:false} );
  }

  login() {
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
        sendData["password"] = this.password;
    this.http.postHttpData("/checkEmail", sendData, (result) => {
      console.log("result");
      console.log(result);
      if(result) {
        if(result == 'not-match') {
          str = '비밀번호가 올바르지 않습니다.';
          this.confirmAlert(str);
        }
        else {  // login sucess
          this.mem_type = result.type;
          let saveData = {
            email: '',
            password: '',
            mem_type: 0
          };
          if( this.saveId && this.savePass ) {
            saveData = {
              email: this.email,
              password: this.password,
              mem_type: this.mem_type
            }
          }
          else if( this.saveId ) {
            saveData = {
              email: this.email,
              password: '',
              mem_type: this.mem_type
            }
          }
          else if( this.savePass ) {
            saveData = {
              email: '',
              password: this.password,
              mem_type: this.mem_type
            }
          }
          this.appmgr.setSaveInfo( saveData );

          let userData = {
            user_id     : result.id,
            name        : result.name,
            email       : result.email,
            login_type  : 'email',
            mem_type    : result.type,
            login_flag  : 1,
      
            push_flag        : result.push_flag,
            status      : result.status,
            address     : result.address,
            contact     : result.contact,
            month_fee   : result.month_fee
          }
          this.appmgr.setUserInfoAll(userData);
          this.navCtrl.setRoot(HomePage, { },{animate:false} );
        }
      }
      else {
        str = '등록되지 않은 계정입니다.';
        this.confirmAlert(str);
      }
    }); 

  }

  findPass() {
    this.navCtrl.push(FindPassPage, {},{animate:false} );
  }
  
  naverLogin() {
    this.naver.login()
    .then(
      (result) => {
          // alert(JSON.stringify(result));
          // result.email, result.nickname, result.age, result.gender(M), result.id, result.name
          // alert(result.email+"\n"+result.nickname+"\n"+result.age+"\n"+result.gender
          //                 +"\n"+result.id+"\n"+result.name);                                
          // this.navCtrl.push(LoginPage, {login_type:1, email:result.email}, {animate:false}); // 성공
          this.checkLogin( result.email );
          // alert('naver email='+ result.email);
      },
      (err) => {                        
        console.log("naverLogin : "+ err); // 실패
      }
    );
  }
  kakaotalkLogin() {
      let loginOptions = {};        
      loginOptions['authTypes'] = [AuthTypes.AuthTypeTalk, AuthTypes.AuthTypeStory, AuthTypes.AuthTypeAccount];
      
      this.kakaoCordovaSDK.login(loginOptions)
      .then(
          (result) => {         
              // res.id, res.nickname
              console.log(result);
              console.log(result.properties.email);
              console.log(result.properties.nickname);
              // alert(result.id+"\n"+result.accessToken+"\n"+result.nickname);
              // this.navCtrl.push(LoginPage, {login_type:2, email:result.email}, {animate:false}); // 성공
              this.checkLogin(result.id);
          },
          (err) => {     
            console.log(err);     
            window.alert( JSON.stringify(err, Object.getOwnPropertyNames(err)));              
              console.log("kakaotalkLogin Err: "+err.errorCode); // 실패
          }
      );  
  }
  
  checkLogin(email) { // naver login
    let sendData = [];
        sendData["email"] = email;
    this.http.postHttpData("/checkUser", sendData, (result) => {
        if(result) {
          let userData = {
            user_id     : result.id,
            name        : result.name,
            email       : result.email,
            // login_type  : 'naver',
            login_type  : 'kakao',
            mem_type    : result.type,
            login_flag  : 1,
      
            push_flag   : result.push_flag,
            status      : result.status,
            address     : result.address,
            contact     : result.contact,
            month_fee   : result.month_fee
          }
          this.appmgr.setUserInfoAll(userData);
          this.navCtrl.setRoot(HomePage, { },{animate:false} );
        }
        else  // new user
        {
          let sendData = [];
              sendData["email"] = email;
              sendData["password"] = '';
              sendData["type"] = 0;
              sendData["login_type"] = 'kakao';
          this.http.postHttpData("/registerUser", sendData, (result) => {
            if(result) 
            {
              let saveData = {
                email: '',
                password: '',
                mem_type: 0
              }
              this.appmgr.setSaveInfo( saveData );

              let userData = {
                email: email,
                user_id: result,
                mem_type: 0,
                login_flag: 1
              }
              this.appmgr.setUserInfoIndivial(userData);
              this.navCtrl.setRoot(HomePage, { },{animate:false} );
            }
          });
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
