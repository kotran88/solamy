import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { LoadingPage } from '../loading/loading';

import { TextEncoder, TextDecoder } from 'text-encoding';
// common 
import { HttpProvider } from '../../providers/http/http';
import { CommonProvider } from '../../providers/common/common';
import { CONFIG } from '../../config/config';

@Component({
  selector: 'page-company-detail',
  templateUrl: 'company-detail.html',
})
export class CompanyDetailPage {
  comp_id = 0;
  analyse_id = 0;
  elect_licence = '';   // 전기면허증
  comData : any;         // 고객의뢰 data
  contInfoData :any;    // 견적관리정보
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController,
    public common: CommonProvider,
    public http: HttpProvider,
    private photoViewer: PhotoViewer 
  ) {
    this.comp_id = navParams.get('comp_id');
    this.analyse_id = navParams.get('analyse_id');
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
    // 회사상세정보
    window.alert(this.comp_id);
    let modal = this.modalCtrl.create(LoadingPage, {txt: "로딩중입니다..."});
        modal.present({animate:false});
    let sendData = [];
        sendData["comp_id"] = this.comp_id;
        sendData["analyse_id"] = this.analyse_id;
    this.http.postHttpData("/getCompanyDetail", sendData, (result) => {
      modal.dismiss({}, "", {animate:false});

      console.log(result);
      if(result) {

        // for(var i=0; i<result.length; i++){
         
          this.elect_licence = result.elect_num;
          this.comData={"area":this.uintToString(result.area.data),"as_guide":this.uintToString(result.as_guide.data),"id":result.id,"elec_licence":result.elec_licence,"inv_flag":result.inv_flag,"inv_gflag":result.inv_gflag,"module_flag":result.module_flag,"module_gflag":result.module_gflag,"quality_flag":result.quality_flag,"inv_guarent":this.uintToString(result.inv_guarent.data),"module_guarent":this.uintToString(result.module_guarent.data),"quality":this.uintToString(result.quality.data),"inv_name":this.uintToString(result.inv_name.data),"module_name":this.uintToString(result.module_name.data),"address":this.uintToString(result.address.data),"company_name": this.uintToString(result.company_name.data),"comp_id":result.comp_id,"final_price":result.final_price,"rate":result.rate,"analyse_id":result.analyse_id};
        // }

      console.log("comdata");
      console.log(this.comData);
      }
    });
    // 견적관리정보
    let sendData1 = [];
    this.http.postHttpData("/getContractInfoData", sendData1, (result) => {
      if(result) {
        console.log(result);
        this.contInfoData = {"id":result.id,"elec_licence":result.elec_licence,"inv_flag":result.inv_flag,"inv_gflag":result.inv_gflag,"module_flag":result.module_flag,"module_gflag":result.module_gflag,"quality_flag":result.quality_flag,"inv_guarent":this.uintToString(result.inv_guarent.data),"inv_name":this.uintToString(result.inv_name.data),
        "module_guarent":this.uintToString(result.module_guarent.data),"module_name":this.uintToString(result.module_name.data),
        "quality":this.uintToString(result.quality.data)};

        console.log(this.contInfoData);
      }
    });
  }
  
  back() {
    this.navCtrl.pop({animate:false});
  }

  electLicence() {
    if( this.contInfoData ) {
      if( this.elect_licence && this.contInfoData.elec_licence == 1 ) return true;
      else return false;
    }else return false;
  }

  hasComData() {
    if(this.comData) 
      return true;
    else 
      return false
  }
  // common
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
    console.log(type);
    console.log(this.contInfoData);
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
  
  viewImg(img_url) {
    let title = "";
    let options = {
        share: false, // default is false
        closeButton: true, // default is true
        copyToReference: false // default is false
    };
    img_url = CONFIG.IMG_URL + img_url;
    this.photoViewer.show(img_url, title, options);
  }

  convRate(rate) {
    if(rate) {
      if(rate > 4)
        return rate.toFixed(1);
      else {
        return '4.0';
      }
    }else {
      return '4.0';
    }
  }

  numFormat( str ) {
    if(str)
      return this.common.number_format(str);
    else
      return '0';
  }
}
