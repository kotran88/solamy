import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CurrentInstallDetailPage } from '../current-install-detail/current-install-detail';

/**
 * Generated class for the CurrentInstallPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-current-install',
  templateUrl: 'current-install.html',
})
export class CurrentInstallPage {
  installArray=[];
  array_detail=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('ionViewDidLoad CurrentInstallPage');
    console.log(this.navParams.get("array"))
    this.installArray=this.navParams.get("array");

    this.array_detail=this.navParams.get("array_detail");
    console.log(this.installArray);
    console.log(this.array_detail);
  }
  back() {
    this.navCtrl.pop({animate:false});
  }
  gotodetail(a){
    console.log(a);
    console.log(this.array_detail)
    var abc= []

    for(var i=0; i<this.array_detail.length; i++){
      console.log(a.id+"////"+this.array_detail[i].p_id);
      if(a.id==this.array_detail[i].p_id){
        console.log("id matche d:"+a.id);
        console.log(this.array_detail[i]);
        abc=this.array_detail[i];
      }
    }
 
    this.navCtrl.push(CurrentInstallDetailPage,{"array":a,"array_detail":this.array_detail})
  }
  ionViewDidLoad() {
   
  }

}
