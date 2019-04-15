import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../config/config';

@Injectable()
export class HttpProvider {
    constructor(
        public http: HttpClient) {
    }
    
    postHttpData(subUrl, sendData, callback) {
        var url = CONFIG.http_server + subUrl;
        var postData = new FormData();
        var array_key = Object.keys(sendData);
        
        for(let idx = 0; idx < array_key.length; idx++) {
            postData.append(array_key[idx], sendData[array_key[idx]]);
        }
        var data : Observable<any> = this.http.post(url, postData);
        data.subscribe(
            (res) => {
                if(res.errcode == 'ok') {
                    callback(res.errmsg);
                }
                else if(res.errcode == 'fail') {
                    callback(null);
                }
            }, 
            (err) => {
                console.log("postHttpData"+JSON.stringify(err));
            }
        );
    }    
}