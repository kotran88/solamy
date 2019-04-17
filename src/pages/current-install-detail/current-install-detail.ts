import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CurrentInstallDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-current-install-detail',
  templateUrl: 'current-install-detail.html',
})
export class CurrentInstallDetailPage {

  time:any;
  address:any;
  amount:any;
  name:any;
  url:any;
  array:any;
  currentarray=[];
  array_detail=[];
  realdetail=[];
  invertername:any;
  inverterphoto:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.array=this.navParams.get("array")
    this.array_detail=this.navParams.get("array_detail");
    this.name=this.array.subject;
    this.amount=this.array.amount;
    this.url=this.array.url;
    this.address=this.array.area;
    this.time=this.array.i_date.split("T")[0].replace("-",".").replace("-",".");

  
    console.log('ionViewDidLoad CurrentInstallDetailPage');
    console.log(this.array_detail);
    console.log(this.array);
    for(var i=0; i<this.array_detail.length; i++){
      if(this.array_detail[i].p_id==this.array.id){


        this.realdetail.push(this.array_detail[i]);

      }
    }
    console.log("real one is : ");
    console.log(this.realdetail);
    for(var i=0; i<this.realdetail.length; i++){
      if(this.realdetail[i].code==2){
        this.invertername=this.realdetail[i].content;
        this.inverterphoto="http://solarmy.co.kr/"+this.realdetail[i].filepath+this.realdetail[i].filename;
      }
      if(this.realdetail[i].code==1){
        this.currentarray.push("http://solarmy.co.kr/"+this.realdetail[i].filepath+this.realdetail[i].filename);
      
      }
     
    }
    console.log(this.currentarray);
  }
 
  back() {
    this.navCtrl.pop({animate:false});
  }
  ionViewDidLoad() {
    
  }

}
