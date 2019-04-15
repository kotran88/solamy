import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';

import { LoadingPage } from '../loading/loading';
// common 
import { AppmgrProvider } from '../../providers/appmgr/appmgr';
import { HttpProvider } from '../../providers/http/http';
import { CommonProvider } from '../../providers/common/common';

import { TextEncoder, TextDecoder } from 'text-encoding';
@Component({
  selector: 'page-myquot-view',
  templateUrl: 'myquot-view.html',
})
export class MyquotViewPage {
  user_id = 0;
  submitCont :any;
  contInfoData :any;
  cont_id = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private appmgr: AppmgrProvider,
    public common: CommonProvider,
    public http: HttpProvider,
    public modalCtrl: ModalController) {
      this.cont_id = navParams.get('cont_id');
      console.log(this.cont_id);
      let userInfo = this.appmgr.getUserInfo();
    this.user_id = userInfo.user_id;
    // initialize
    // 제출한 견적얻기
    let modal = this.modalCtrl.create(LoadingPage, {txt: "로딩중입니다..."});
    modal.present({animate:false});
    let sendData = [];
        sendData["cont_id"] = this.cont_id;
    this.http.postHttpData("/getContractById", sendData, (result) => {
      modal.dismiss({}, "", {animate:false});
      if(result) {
        console.log(result);
        //module_name
        this.submitCont = {"price":result.price,"person":result.person,"module_name":this.uintToString(result.module_name.data),
        "inv_guarent":this.uintToString(result.inv_guarent.data),"inv_name":this.uintToString(result.inv_name.data),
        "final_price":result.final_price,
          "quality":this.uintToString(result.quality.data),"as_guide":this.uintToString(result.as_guide.data),"module_guarent":this.uintToString(result.module_guarent.data)};
      }
      else {
        console.log("???"+result);
        this.submitCont  = null;
      }
    });
    // 견적관리정보
    let sendData1 = [];
    this.http.postHttpData("/getContractInfoData", sendData1, (result) => {
      if(result) {
        console.log(result);
        this.contInfoData = result;
      }
    });

  }
  uintToString(uintArray) {
    var decoder = new TextDecoder("utf-8");
  
        var  decodedString = decoder.decode(new Uint8Array(uintArray));
      return decodedString;
  }
  ionViewWillEnter() {
    
  }

  back() {
    this.navCtrl.pop({animate:false});
  }
  // common
  hasData() {
    if(this.submitCont) {
      return true;
    }else return false;
  }
  getContInfo(type, value) {
    if(!this.contInfoData) return '';
    let arrStr = '';
    if(type == 'module_name') {
      arrStr = this.contInfoData.module_name.split(",");
      return arrStr[value];
    }
    else if(type == 'inv_name') {
      arrStr = this.contInfoData.inv_name.split(",");
      return arrStr[value];
    }
    else if(type == 'quality') {
      arrStr = this.contInfoData.quality.split(",");
      return arrStr[value];
    }
    else if(type == 'module_guarent') {
      arrStr = this.contInfoData.module_guarent.split(",");
      return arrStr[value];
    }
    else if(type == 'inv_guarent') {
      arrStr = this.contInfoData.inv_guarent.split(",");
      return arrStr[value];
    }
    
  }
  hasContInfo(type) {
    if(!this.contInfoData) return false;
    
    if(type == 'module_name' && this.contInfoData.module_flag == 1) {
      return true;
    }
    else if(type == 'inv_name' && this.contInfoData.inv_flag == 1) {
      return true;
    }
    else if(type == 'quality' && this.contInfoData.quality_flag == 1) {
      return true;
    }
    else if(type == 'module_guarent' && this.contInfoData.module_gflag == 1) {
      return true;
    }
    else if(type == 'inv_guarent' && this.contInfoData.inv_gflag == 1) {
      return true;
    }
    return false;
  }
  numFormat( str ) {
    if(str)
      return this.common.number_format(str);
    else
      return '0';
  }
  returnData(date) {
    let date1 = this.common.getStrDate(date)
    if( date1 ) {
      return date1.replace(/-/g, ".").substring(0,10);
    }else {
      return '';
    }
  }

}
