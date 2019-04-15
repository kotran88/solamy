import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-calendarmodal',
    templateUrl: 'calendarmodal.html',
})

export class CalendarmodalPage {    
    calendarArr = [];
    cur_sel_week_day = "";
    one_cur_sel_week_day = "";
    week_days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    one_week_days = ["일", "월", "화", "수", "목", "금", "토"];
    curSelDate: any;
    curStrSelDate = "";
        
    constructor(        
        public viewCtrl: ViewController, 
        public navParams: NavParams)
    {
        this.curStrSelDate = this.navParams.get("reserve_date");
        if(this.curStrSelDate != "") {
            this.curSelDate = new Date(this.curStrSelDate);
        }
    }

    ionViewDidLoad() {
        if(this.curStrSelDate == "") {
            this.curSelDate = this.getToday();
            let year = this.curSelDate.getFullYear();
            let month = this.curSelDate.getMonth() + 1;
            let day = this.curSelDate.getDate();
            this.curStrSelDate = this.correctDate(year, month, day);
        }        

        let week_day = this.curSelDate.getDay();
        this.cur_sel_week_day = this.week_days[week_day];
        this.one_cur_sel_week_day = this.one_week_days[week_day];
        
        for (let i = 0; i < 7; i++) {
            let curDate = new Date();
            curDate.setMonth(curDate.getMonth() + i);
            this.calendarArr.push(this.getDaysInThisMonth(curDate));
        }
    }

    getToday() {
        let now_date = new Date();
        let year = now_date.getFullYear();
        let month = now_date.getMonth() + 1;
        let day = now_date.getDate();
        let today = new Date(this.correctDate(year, month, day));
        return today;
    }

    isToday(year, month, day) {
        let date = new Date(this.correctDate(year, month, day));
       
        if(date.getTime() == this.curSelDate.getTime())
            return true;
        else
            return false;
    }

    isEnableSel(year, month, day) {
        let date = new Date(this.correctDate(year, month, day));
        
        if(date.getTime() < this.getToday().getTime())
            return "day1";           
        else
            return "day2";
    }

    selDay(year, month, day) {        
        let date = new Date(this.correctDate(year, month, day));
        if(date.getTime() >= this.getToday().getTime()) {
            this.curSelDate = new Date(this.correctDate(year, month, day));
            this.curStrSelDate = this.correctDate(year, month, day);
            let week_day = this.curSelDate.getDay();
            this.cur_sel_week_day = this.week_days[week_day];
            this.one_cur_sel_week_day = this.one_week_days[week_day];
        }            
    }

    correctDate(year, month, day) {
        let t_month = parseInt(month) < 10 ? '0'+month : month;
        let t_day = parseInt(day) < 10 ? '0'+day : day;
        return year+'-'+t_month+'-'+t_day;
    }

    getDaysInThisMonth(date) {        
        let daysInThisMonth = new Array();
        let days7InThisMonth = new Array();
        let year = date.getFullYear();
        let month = date.getMonth()+1;
                              
        let first_week_day = new Date(this.correctDate(year, month, 1)).getDay();
        for (let i = 0; i < first_week_day; i++) {
            daysInThisMonth.push('');
        }

        let thisNumOfDays = new Date(year, month, 0).getDate();        
        let last_day = 0;
        for (let i = 0; i < thisNumOfDays; i++) {
            daysInThisMonth.push(''+(i+1));
            last_day = i+1;
        }

        let last_week_day = new Date(this.correctDate(year, month, last_day)).getDay();        
        for (let i = 0; i < (6-last_week_day); i++) {
            daysInThisMonth.push('');
        }
        
        let days7Cnt = -1;
        for (let i = 0; i < daysInThisMonth.length; i++) {
            if(i % 7 == 0) {
                days7Cnt++;
                days7InThisMonth[days7Cnt] = new Array();                
            }
            days7InThisMonth[days7Cnt].push(daysInThisMonth[i]);
        }

        let calendarInfo = {
            year: year,
            month: month,
            days: days7InThisMonth
        }
        return calendarInfo;
    }

    confirm() {        
        this.viewCtrl.dismiss({date: this.curStrSelDate, week_day: this.one_cur_sel_week_day}, "", {animate:false});
    }

    cancel() {
        this.viewCtrl.dismiss({date: "", week_day: ""}, "", {animate:false});
    }
}