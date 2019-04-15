import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
    selector: 'page-loading',
    templateUrl: 'loading.html',
})

export class LoadingPage {
    load_txt = "";

    constructor(public navParams: NavParams) {
        this.load_txt = this.navParams.get("txt");
    }
}
