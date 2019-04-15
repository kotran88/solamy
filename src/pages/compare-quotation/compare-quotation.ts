import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { RegisterTypePage } from '../register-type/register-type';
import { AnalyseClientPage } from '../analyse-client/analyse-client';

// common 
import { AppmgrProvider } from '../../providers/appmgr/appmgr';
import { HttpProvider } from '../../providers/http/http';
import { CommonProvider } from '../../providers/common/common';

@Component({
  selector: 'page-compare-quotation',
  templateUrl: 'compare-quotation.html',
})
export class CompareQuotationPage {

  user_id = 0;
  login_flag = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private appmgr: AppmgrProvider,
    public common: CommonProvider,
    public http: HttpProvider) {
      let userInfo = this.appmgr.getUserInfo();
    this.user_id = userInfo.user_id;
    
    if(userInfo.login_flag == 1) {
      this.login_flag = true;
    }else {
      this.login_flag = false;
    }

  }

  

  back() {
    this.navCtrl.pop({animate:false});
  }
  
  analyseClient() {
    this.navCtrl.push(AnalyseClientPage, {}, {animate:false} );
  }

  registerPage() {
    this.navCtrl.push(RegisterTypePage, {},{animate:false} );
  }
  
  login() {
    this.navCtrl.push(LoginPage, {},{animate:false} );
  }
  
  isLogin() {
    if(this.login_flag == true)
        return true;
    else
        return false;
  }
}
