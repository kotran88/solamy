import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';

import { AnalyseResultPage } from '../analyse-result/analyse-result';
import { ProcessStatusPage } from '../process-status/process-status';
import { AnalyseClientPage } from '../analyse-client/analyse-client';
import { LoadingPage } from '../loading/loading';

import { TextEncoder, TextDecoder } from 'text-encoding';
// common 
import { AppmgrProvider } from '../../providers/appmgr/appmgr';
import { HttpProvider } from '../../providers/http/http';
import { CommonProvider } from '../../providers/common/common';

@Component({
  selector: 'page-my-client',
  templateUrl: 'my-client.html',
})
export class MyClientPage {
  user_id = 0;
  clientFlag = false;
  clientData :any;
  hasContractData = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController,
    private appmgr: AppmgrProvider,
    public common: CommonProvider,
    public http: HttpProvider) {
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
    
    let modal = this.modalCtrl.create(LoadingPage, {txt: "로딩중입니다..."});
    modal.present({animate:false});
    let sendData = [];
        sendData["user_id"] = this.user_id;
    this.http.postHttpData("/getAnalyseByUserId", sendData, (result) => {
      modal.dismiss({}, "", {animate:false});

      console.log("getAnalyseByUserId");
      console.log(result);

      var tag="reg_time";
      result.sort(function(a, b) {
        console.log(a[tag]);
        // convert date object into number to resolve issue in typescript
        var dateA = new Date(a[tag]).getTime();
    var dateB = new Date(b[tag]).getTime();
    return dateB > dateA ? 1 : -1;  
      })

      for(var i=0; i<result.length; i++){
        var newaddress=this.uintToString(result[i].address.data); 
        console.log(newaddress);
        result[i].address=newaddress;
      }
      



      if(result) {
        this.clientFlag = true;
        this.clientData = result;
      }
      else {
        this.clientFlag = false;
        this.clientData = null;
      }
    });
  }

  back() {
    this.navCtrl.pop({animate:false});
  }

  analyseResult( id ) {
    this.navCtrl.push(AnalyseResultPage, { analyse_id: id },{animate:false} );
  }
  
  processStatus( id ) {
    this.navCtrl.push(ProcessStatusPage, { analyse_id: id },{animate:false} );
  }

  analyseClient() {
    this.navCtrl.push(AnalyseClientPage, {}, {animate:false} );
  }

  isClient() {
    if( this.clientFlag ) {
      return true;
    }else {
      return false;
    }
  }

  hasContDate( id ) {
    for(var i=0; i< this.clientData.length; i++) {
      if(id == i) {
        if( !this.clientData[i].contract_time ) {
          return false;
        }else {
          return true;
        }
      }
    }
  }

  returnData(date) {
    if( !date ) {
      return '';
    }
    let date1 = this.common.getStrDate(date)
    if( date1 ) {
      return date1.replace(/-/g, ".").substring(0,10);
    }else {
      return '';
    }
  }

  numFormat( str ) {
    if(str)
      return this.common.number_format(str);
    else 
      return '0';
  }

}
