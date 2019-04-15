import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';

import { MyquotStatusPage } from '../myquot-status/myquot-status';

// common 
import { AppmgrProvider } from '../../providers/appmgr/appmgr';
import { HttpProvider } from '../../providers/http/http';
import { CommonProvider } from '../../providers/common/common';

import { TextEncoder, TextDecoder } from 'text-encoding';
@Component({
  selector: 'page-myquot-input',
  templateUrl: 'myquot-input.html',
})
export class MyquotInputPage {
  quotFlag = false;
  // 
  analyse_id = 0;
  user_id = 0;
  email = '';
  contInfoData :any;    // 견적관리정보
  // main data
  person = 1;
  insPrice = 0;
  module_name = '';
  inv_name    = '';
  quality     = '';
  module_guarent = '';
  inv_guarent = '';
  as_guide   = '';
  final_price = 0;
  // select data
  modNameData = [];
  invNameData = [];
  qualityData = [];
  modGuaData = [];
  invGuaData = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,
    private appmgr: AppmgrProvider,
    public common: CommonProvider,
    public http: HttpProvider
  ) {
    this.analyse_id = navParams.get('analyse_id');
    let userInfo = this.appmgr.getUserInfo();
    this.user_id = userInfo.user_id;
    this.email = userInfo.email;
    
    // 견적관리정보
    let sendData1 = [];
    this.http.postHttpData("/getContractInfoData", sendData1, (result) => {
      if(result) {
        console.log(result);
        this.contInfoData = {"module_name":this.uintToString(result.module_name.data),"inv_name":this.uintToString(result.inv_name.data),
        "quality":this.uintToString(result.quality.data),"module_guarent":this.uintToString(result.module_guarent.data),
          "inv_guarent":this.uintToString(result.inv_guarent.data),"module_flag":result.module_flag,"inv_flag":result.inv_flag,"inv_gflag":result.inv_gflag,"module_gflag":result.module_gflag,"quality_flag":result.quality_flag
      };
        console.log("contInfoData");
        console.log(this.contInfoData);
        this.modNameData    = this.contInfoData.module_name.split(",");
        this.invNameData    = this.contInfoData.inv_name.split(",");
        this.qualityData    = this.contInfoData.quality.split(",");
        this.modGuaData     = this.contInfoData.module_guarent.split(",");
        this.invGuaData     = this.contInfoData.inv_guarent.split(",");
      }
    });
  }
  uintToString(uintArray) {
    var decoder = new TextDecoder("utf-8");
  
      var encodedString = String.fromCharCode.apply(null, uintArray);
        var  decodedString = decoder.decode(new Uint8Array(uintArray));
  //         let decoder = new TextDecoder('utf-8');
  // return decoder.decode(uintArray);
      //  var   decodedString = encodeURIComponent(encodedString);
      return decodedString;
  }
  ionViewWillEnter() {
    let userInfo = this.appmgr.getUserInfo();
    this.user_id = userInfo.user_id;
    this.email = userInfo.email;
    
    // 견적관리정보
    let sendData1 = [];
    this.http.postHttpData("/getContractInfoData", sendData1, (result) => {
      if(result) {
        console.log(result);
        this.contInfoData = {"module_name":this.uintToString(result.module_name.data),"inv_name":this.uintToString(result.inv_name.data),
        "quality":this.uintToString(result.quality.data),"module_guarent":this.uintToString(result.module_guarent.data),
          "inv_guarent":this.uintToString(result.inv_guarent.data),"module_flag":result.module_flag,"inv_flag":result.inv_flag,"inv_gflag":result.inv_gflag,"module_gflag":result.module_gflag,"quality_flag":result.quality_flag
      };
        
        this.modNameData    = this.contInfoData.module_name.split(",");
        this.invNameData    = this.contInfoData.inv_name.split(",");
        this.qualityData    = this.contInfoData.quality.split(",");
        this.modGuaData     = this.contInfoData.module_guarent.split(",");
        this.invGuaData     = this.contInfoData.inv_guarent.split(",");
      }
    });
  }

  back() {
    this.navCtrl.pop({animate:false});
  }

  quotSubmit() {
    if( !this.validation() ) return false;
    let sendData= [];
        sendData["analyse_id"]  = this.analyse_id;
        sendData["comp_id"] 	  = this.user_id;
        sendData["person"] 		  = this.person;
        sendData["price"] 	  = this.insPrice;
        sendData["module_name"] = this.module_name;
        sendData["inv_name"] 	  = this.inv_name;
        sendData["quality"] 	  = this.quality;
        sendData["module_guarent"] = this.module_guarent;
        sendData["inv_guarent"] = this.inv_guarent;
        sendData["as_guide"] 	  = this.as_guide;
        sendData["final_price"] = this.final_price;

    this.http.postHttpData("/setSubmitContract", sendData, (result) => {
      if(result) {
        this.quotFlag = true;
      }
    });
  }

  validation() {
    let str = '';
    if( this.insPrice == 0 ) {
      str = '설치 견적비용을 입력하세요.';
      this.confirmAlert(str);
      return false;
    }
    else if( this.as_guide == '' ) {
      str = '보증기간 및 A/S 안내를 입력하세요.';
      this.confirmAlert(str);
      return false;
    }
    else if( this.final_price == 0 ) {
      str = '최종 소비자가격을 입력하세요.';
      this.confirmAlert(str);
      return false;
    }
    
    else if( this.module_name == '' ) {
      str = '모듈 제품명을 입력하세요.';
      this.confirmAlert(str);
      return false;
    }
    else if( this.inv_name == '' ) {
      str = '인버터 제품명을 입력하세요.';
      this.confirmAlert(str);
      return false;
    }
    else if( this.quality == '' ) {
      str = '설치할 구조물 품질을 입력하세요.';
      this.confirmAlert(str);
      return false;
    }
    else if( this.module_guarent == '' ) {
      str = '모듈보증을 입력하세요.';
      this.confirmAlert(str);
      return false;
    }
    else if( this.inv_guarent == '' ) {
      str = '인버터 보증을 입력하세요.';
      this.confirmAlert(str);
      return false;
    }
    return true;
  }

  quotList() {
    this.navCtrl.push(MyquotStatusPage, { tab: 'tab2' },{animate:false} );
  }
  // common

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

  operator(operate) {
    if(operate == 'inc') {
      this.person++;
    }
    else {
      if(this.person == 1) return;
      this.person--;
    }
  }

  isQuot() {
    if(this.quotFlag == true) {
      return true;
    }
    else {
      return false;
    }
  }
  isFirst( id ) {
    if(id==0) return true;
    else return false;
  }
  
  confirmAlert(str) {
    let alert = this.alertCtrl.create({      
        subTitle: str,
        buttons: ['확인']
    });
    alert.present({animate:false});
  }
}
