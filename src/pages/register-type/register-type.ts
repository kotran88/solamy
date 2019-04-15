import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RegisterPage } from '../register/register';

// common 
import { AppmgrProvider } from '../../providers/appmgr/appmgr';

@Component({
  selector: 'page-register-type',
  templateUrl: 'register-type.html',
})
export class RegisterTypePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private appmgr: AppmgrProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterTypePage');
  }

  back() {
    this.navCtrl.pop({animate:false});
  }
  
  registerCustomer() {
    this.gotoRegister(0);
  }
  
  registerPartners() {
    this.gotoRegister(1);
  }

  gotoRegister ( mem_type ) {
    let saveData = {
      email: '',
      password: '',
      mem_type: mem_type
    }
    this.appmgr.setSaveInfo( saveData );
    this.navCtrl.push(RegisterPage, {},{animate:false} );
  }
}
