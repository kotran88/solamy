import { CONFIG } from '../../config/config';
import { Injectable } from '@angular/core';

@Injectable()
export class CommonProvider {
    constructor() {}

    number_format(num) {
        var regexp = /\B(?=(\d{3})+(?!\d))/g;
        return num.toString().replace(regexp, ',');
    }

    isExistImage(url) {        
        if(url != '' && url != null) {
            return true;
        }
        else {
            return false;
        }
    }

    subString(str, len) {
        if(str.length > len)
            return str.substr(0, len)+"...";
        else
            return str;        
    }

    showDistance(distance) {
        if(distance == 0)
            return 0;
        else 
            return Math.floor(distance/1000);
    }

    getServerImg(type, imgName) {
        return CONFIG.http_server+"/getServerImg?"+"type="+type+"&img="+imgName;
    }    
    
    getStrDate(str_date) {
        let now_date = null;
        if(!str_date) {
            now_date = new Date();
        }else {
            now_date = new Date(str_date);
        }
        let year = now_date.getFullYear();
        let month = now_date.getMonth() + 1;
        let day = now_date.getDate();
        let hour = now_date.getHours();
        let minute = now_date.getMinutes();
        let second = now_date.getSeconds();
        month = month < 10 ? '0'+month : month;
        day = day < 10 ? '0'+day : day;
        hour = hour < 10 ? '0'+hour : hour;
        minute = minute < 10 ? '0'+minute : minute;
        second = second < 10 ? '0'+second : second;
        
        // return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
        return year+"-"+month+"-"+day+" "+hour+":"+minute;
    };
}
