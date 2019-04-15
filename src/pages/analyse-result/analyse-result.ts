import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';

import { TextEncoder, TextDecoder } from 'text-encoding';
// common 
import { HttpProvider } from '../../providers/http/http';
import { CommonProvider } from '../../providers/common/common';
import { LoadingPage } from '../loading/loading';
import { CONFIG } from '../../config/config';

@Component({
  selector: 'page-analyse-result',
  templateUrl: 'analyse-result.html',
})
export class AnalyseResultPage {
  analyse_id = 0;
  roof_path = ''
  anData = null;
  address  = '';
  etc:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController,
    public common: CommonProvider,
    public http: HttpProvider
  ) {
      this.analyse_id = navParams.get('analyse_id');
  }
  uintToString(uintArray) {
    var decoder = new TextDecoder("utf-8");
      var encodedString = String.fromCharCode.apply(null, uintArray);
        var  decodedString = decoder.decode(new Uint8Array(uintArray));
      return decodedString;
  }
  ionViewWillEnter() {
    let modal = this.modalCtrl.create(LoadingPage, {txt: "로딩중입니다..."});
    modal.present({animate:false});
    let sendData = [];
        sendData["analyse_id"] = this.analyse_id;
        console.log(this.analyse_id);
    this.http.postHttpData("/getAnalyseResult", sendData, (result) => {
      console.log(result);
      modal.dismiss({}, "", {animate:false});
      if(result) {
        this.anData = result;

        if(this.uintToString(result.roof_path.data).length>0) {
          this.roof_path = "http://solarmy.co.kr/solarmy_admin/uploads/" + this.uintToString(result.roof_path.data);
        }else {
          this.roof_path = 'assets/imgs/analyse/analyze_banner.png';
        }
        console.log("roof path i s:"+this.roof_path);
        this.address = this.uintToString(result.address.data);
        this.etc = this.uintToString(result.etc.data);
        // console.log(this.etc);
      }
    });
  }

  back() {
    this.navCtrl.pop({animate:false});
  }

  numFormat( str ) {
    // console.log(this.anData);
    if(this.anData) {
      if( str == 'month_fee' ) {
        return this.common.number_format(this.anData.month_fee);
      }else if( str == 'sale_fee' ) {
        return this.common.number_format(this.anData.sale_fee);
      }else if( str == 'elect_fee' ) {
        return this.common.number_format(this.anData.elect_fee);
      }else if( str == 'expect_elect_fee' ) {
        return this.common.number_format(this.anData.expect_elect_fee);
      }else if( str == 'solar_power' ) {
        return this.common.number_format(this.anData.solar_power);
      }else if( str == 'opt_angle' ) {
        return this.common.number_format(this.anData.opt_angle);
      }else if( str == 'month_expect_power' ) {
        return this.common.number_format(this.anData.month_expect_power);
      }else if( str == 'expect_power' ) {
        return this.common.number_format(this.anData.expect_power);
      }else if( str == 'tree_effect' ) {
        return this.common.number_format(this.anData.tree_effect);
      }else if( str == 'co_pexpect' ) {
        return this.common.number_format(this.anData.co_pexpect);
      }else if( str == 'etc' ) {
        return this.anData.etc;
      }else{
        return str;
      }
    }
    else {
      return str;
    }
  }

  hasAnResult() {
    if(this.anData) {
      return true;
    }else 
      return false;
  }
}
