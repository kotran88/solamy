import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-process-statmodal',
  templateUrl: 'process-statmodal.html',
})
export class ProcessStatmodalPage {

  constructor(
    public viewCtrl: ViewController,  public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProcessStatmodalPage');
  }

  cancel() {
    this.viewCtrl.dismiss({}, "", {animate:false});
  }
  
  confirm() {
    this.viewCtrl.dismiss({client:1}, "", {animate:false});
  }
}
