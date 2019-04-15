import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TextEncoder, TextDecoder } from 'text-encoding';
// common 
import { AppmgrProvider } from '../../providers/appmgr/appmgr';
import { HttpProvider } from '../../providers/http/http';
import { CommonProvider } from '../../providers/common/common';

@Component({
  selector: 'page-term',
  templateUrl: 'term.html',
})
export class TermPage {
  type = '';
  content = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private appmgr: AppmgrProvider,
    public common: CommonProvider,
    public http: HttpProvider
  ) {
    let typeTmp = navParams.get('type');
    if(typeTmp == 'term') {
      this.type = '이용약관';
    }else {
      this.type = '개인정보 처리 방침';
    }
  }
  uintToString(uintArray) {
    var decoder = new TextDecoder("utf-8");
  
      var encodedString = String.fromCharCode.apply(null, uintArray);
        var  decodedString = decoder.decode(new Uint8Array(uintArray));
      return decodedString;
  }
  ionViewWillEnter() {
    let sendData = [];
        sendData['type'] = this.type == '이용약관' ? 0 : 1;
    this.http.postHttpData("/getTerm", sendData, (result) => 
    {
      console.log(result);
      if(result) {
        
        this.content = this.uintToString(result.term.data) 
      }
    });
  }

  back() {
    this.navCtrl.pop({animate:false});
  }
}
