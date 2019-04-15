import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';

import { File } from '@ionic-native/file';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { FileTransfer } from '@ionic-native/file-transfer';

import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { TextEncoder, TextDecoder } from 'text-encoding';
import { CalendarmodalPage } from '../calendarmodal/calendarmodal';
import { LoadingPage } from '../loading/loading';
import { PdfViewerPage } from './../pdf-viewer/pdf-viewer';

// common 
import { AppmgrProvider } from '../../providers/appmgr/appmgr';
import { HttpProvider } from '../../providers/http/http';
import { CommonProvider } from '../../providers/common/common';
import { CONFIG } from '../../config/config';

@Component({
  selector: 'page-myquot-process-status',
  templateUrl: 'myquot-process-status.html',
})
export class MyquotProcessStatusPage {

  radio = false;
  client = false; // 의뢰버튼
  // 
  term = false;
  contract = false;
  pay_flag = 0;
  pay_time = '';
  // 평가주기
  imgUrl = [];
  custom_replay = '';
  // 
  user_id = 0;
  submitCont :any;
  cont_id = 0;
  analyse_id = 0;
  // 
  ins_exp_time = '';
  ins_comp_time = '';
  contract_time = '';
  // 
  contract_path = '';
  constructor(public inapp:InAppBrowser,public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController,
    private appmgr: AppmgrProvider,
    public common: CommonProvider,
    public http: HttpProvider,
    private photoViewer: PhotoViewer ,

    public alertCtrl: AlertController,
    private platform: Platform,
    private document: DocumentViewer, 
    private file: File, 
    private transfer: FileTransfer
  ) {
      this.cont_id = navParams.get('cont_id');
      this.analyse_id = navParams.get('analyse_id');


      let userInfo = this.appmgr.getUserInfo();
      this.user_id = userInfo.user_id;
      // initialize
      this.ins_exp_time = this.getToday();
      this.ins_comp_time = this.getToday();
  
      // 제출한 견적얻기
      // let modal = this.modalCtrl.create(LoadingPage, {txt: "로딩중입니다..."});
      // modal.present({animate:false});
      console.log(this.cont_id);
      console.log(this.analyse_id);
      let sendData = [];
          sendData["cont_id"] = this.cont_id;
          sendData["analyse_id"] = this.analyse_id;
      this.http.postHttpData("/getQuotStatus", sendData, (result) => {
        // modal.dismiss({}, "", {animate:false});
        if(result) {

          console.log(result);
          this.submitCont = {"name":this.uintToString(result.name.data),"cont_price":result.cont_price,"price":result.price,"ins_hope_time":result.ins_hope_time};
          this.pay_flag = result.pay_flag;
          this.pay_time = result.pay_time;
          this.custom_replay = this.uintToString(result.custom_replay.data);
          this.contract_time = this.returnData(result.contract_time, 'min');
          if(result.contract_time)
            this.contract = true;   // 계약되어있을 때
            // 
          this.contract_path = this.uintToString(result.contract_path.data);
          // rating
          let star = 'assets/imgs/star.png';
          let stared = 'assets/imgs/star2.png';
          for(var i=0; i<5; i++) {
            if( result.rate > 0 && i+1 <= result.rate ) {
              this.imgUrl[i] = stared;
            }
            else
              this.imgUrl[i] = star;
          }
        }
        else {
          console.log(result);
          this.submitCont  = null;
        }
      });
      
  }

  ionViewWillEnter() {
  
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
  viewContract() {
    console.log(this.contract_path);
    if( !this.contract_path ) {
      let str = '계약서파일이 존재하지 않습니다.';
      this.confirmAlert(str);
      return false;
    }
    
    if(this.contract_path.indexOf('pdf') > 0) {
      //http://solarmy.co.kr/solarmy_admin/uploads/15539567913.pdf
      let url = "http://solarmy.co.kr/solarmy_admin/uploads" +'/'+ this.contract_path;
      var options : InAppBrowserOptions = {
        location : 'yes',//Or 'no' 
        hidden : 'no', //Or  'yes'
        clearcache : 'yes',
        clearsessioncache : 'yes',
        zoom : 'yes',//Android only ,shows browser zoom controls 
        hardwareback : 'yes',
        mediaPlaybackRequiresUserAction : 'no',
        shouldPauseOnSuspend : 'no', //Android only 
        closebuttoncaption : 'Close', //iOS only
        disallowoverscroll : 'no', //iOS only 
        toolbar : 'yes', //iOS only 
        enableViewportScale : 'no', //iOS only 
        allowInlineMediaPlayback : 'no',//iOS only 
        presentationstyle : 'pagesheet',//iOS only 
        fullscreen : 'yes',//Windows only    
    };
      // this.download();
      // const browser = this.inapp.create(this.url,"_system","location=yes,enableViewportScale=yes,hidden=no" );
      let browser = this.inapp.create(url, '_system', options)

        // let modal1 = this.modalCtrl.create(PdfViewerPage, {
        //   url: url
        // });
        // modal1.present();
    }
  }

  setContract() {
    this.contract_time = this.getNow();
    // let analyse_id = this.submitCont ? this.submitCont.analyse_id : 0;
    let sendData = [];
        sendData["cont_id"]       = this.cont_id;
        sendData["ins_exp_time"] = this.ins_exp_time;
        sendData["ins_comp_time"] = this.ins_comp_time;
        sendData["analyse_id"]    = this.analyse_id;
    this.http.postHttpData("/updateContDates", sendData, (result) => {
      if(result) {
        this.contract = true;
      }
    });
  }

  calendarEx() {        
    let modal = this.modalCtrl.create(CalendarmodalPage, { reserve_date : '' });
    modal.present({animate:false});
    modal.onDidDismiss(data => {
        if(data.date != "") {
            this.ins_exp_time = data.date;
        }
    });
  }
  calendarComp() {        
    let modal = this.modalCtrl.create(CalendarmodalPage, { reserve_date : '' });
    modal.present({animate:false});
    modal.onDidDismiss(data => {
        if(data.date != "") {
            this.ins_comp_time = data.date;
        }
    });
  }
  // common
  back() {
    this.navCtrl.pop({animate:false});
  }

  viewImg(img_url) {
    let title = "";
    let options = {
        share: false, // default is false
        closeButton: true, // default is true
        copyToReference: false // default is false
    };
    
    this.photoViewer.show(img_url, title, options);
  }
  
  agreeContract() {
    if(this.term == true)
      this.term = false;
    else
      this.term = true;
  }

  hasData() {
    if(this.submitCont) {
      return true;
    }else return false;
  }
  isTerm() {
    if(this.term == true)
        return true;
    else
        return false;
  }
  isContract() {
    if(this.contract == true)
        return true;
    else
        return false;
  }
  hasPay() {
    if(this.pay_flag == 1)
        return true;
    else
        return false;
  }
  hasRating() {
    if(this.custom_replay)
        return true;
    else
        return false;
  }
  
  numFormat( str ) {
    if(str)
      return this.common.number_format(str);
    else
      return '0';
  }
  returnData(date, type) {
    let date1 = this.common.getStrDate(date)
    if( date1 ) {
      if( type == 'day' )
        return date1.replace(/-/g, ".").substring(0,10);
      else if( type == 'min' )
        return date1.replace(/-/g, ".").substring(0,16);
    }else {
      return '';
    }
  }
  
  correctDate(year, month, day) {
    let t_month = parseInt(month) < 10 ? '0'+month : month;
    let t_day = parseInt(day) < 10 ? '0'+day : day;
    return year+'-'+t_month+'-'+t_day;
  }
  getToday() {
      let now_date = new Date();
      let year = now_date.getFullYear();
      let month = now_date.getMonth() + 1;
      let day = now_date.getDate();
      let today = this.correctDate(year, month, day);
      
      return today;
  }
  formatNow (year, month, day, hour, min) {
    let t_month = parseInt(month) < 10 ? '0'+month : month;
    let t_day = parseInt(day) < 10 ? '0'+day : day;
    return year+'-'+t_month+'-'+t_day+' '+hour+':'+min;
  }
  getNow() {
      let now_date = new Date();
      let year = now_date.getFullYear();
      let month = now_date.getMonth() + 1;
      let day = now_date.getDate();
      let minutes = now_date.getMinutes();
      let hour = now_date.getHours();
      let today = this.formatNow(year, month, day, hour, minutes);
      return today;
  }
  confirmAlert(str) {
    let alert = this.alertCtrl.create({      
        subTitle: str,
        buttons: ['확인']
    });
    alert.present({animate:false});
  }
}
