import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

import { DocumentViewer ,DocumentViewerOptions} from '@ionic-native/document-viewer';
import { LoadingPage } from '../loading/loading';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer,  FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser';


@Component({
  selector: 'page-pdf-viewer',
  templateUrl: 'pdf-viewer.html',
})
export class PdfViewerPage {

  url: any;
  constructor(private fileOpener: FileOpener,private file: File,private transfer: FileTransfer,private diagnostic:Diagnostic,public inapp:InAppBrowser,public document:DocumentViewer,public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
    public viewCtrl: ViewController) {
      this.url = this.navParams.get('url');
      
      console.log(this.url);
    
  //     browser.on('loadstart').subscribe(
  //       (data) => {

  //        this.downloadfile(this.url)
  //       },
  //       err => {
  //         console.log("InAppBrowser Loadstop Event Error: " + err);
  // });
     
    //   let modal = this.modalCtrl.create(LoadingPage, {txt: "로딩중입니다..."});
    //   modal.present({animate:false});
    //   setTimeout(() => {

    //     const options: DocumentViewerOptions = {
    //       title: 'My PDF'
    //     }
        
    //     this.document.viewDocument(this.url, 'application/pdf', options)
    //     modal.dismiss({}, "", {animate:false});
    // }, 5000);
  }
  downloadfile(url)
  {
    console.log("INSIDE DOWNLOAD FILE", url);

    var extension = url.substr(url.length - 4);
    console.log(extension);
      if (extension == '.pdf') {
        console.log("FILE IS PDF");

        this.diagnostic.requestExternalStorageAuthorization().then(e =>{
          const fileTransfer: FileTransferObject = this.transfer.create();  
              fileTransfer.download(url,  this.file.documentsDirectory + "receipt.pdf").then((entry) => {
                console.log('download complete: ' + entry.toURL());

                this.fileOpener.open(entry.toURL(), 'application/pdf')
                .then(() => console.log('File is opened'))
                .catch(e => console.log('Error openening file', e));

              }, (error) => {
                console.log("ERRO WHILE DOWNLOADING", error)
              });
        }).catch(e =>{
          console.log("EXTERNAL STORAGE HAS NO PERMISSIon")
        })

      
      }else{

      }

  }
  download() {
    const fileTransfer: FileTransferObject = this.transfer.create();


    const url = 'http://solarmy.co.kr/solarmy_admin/uploads/15539567913.pdf';
    fileTransfer.download(url, this.file.externalDataDirectory + 'file.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
    });
  }
  onClose(): void {
    this.viewCtrl.dismiss();
  }
}
