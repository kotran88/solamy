import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';

import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Camera } from '@ionic-native/camera';
import { OneSignal } from '@ionic-native/onesignal';
import { NaverLogin } from 'naver-login';
import { KakaoCordovaSDK } from 'kakao-sdk';



import { Diagnostic } from '@ionic-native/diagnostic/ngx';

import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer,FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { TextEncoder, TextDecoder } from 'text-encoding';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';
// pages
import { MyApp } from './app.component';
import { FirstPage } from '../pages/first/first';
import { HomePage } from '../pages/home/home';
import { CalendarmodalPage } from '../pages/calendarmodal/calendarmodal';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { RegisterAuthPage } from '../pages/register-auth/register-auth';
import { RegisterTypePage } from '../pages/register-type/register-type';
import { FindPassPage } from '../pages/find-pass/find-pass';
import { TermPage } from '../pages/term/term';
import { CustomCenterPage } from '../pages/custom-center/custom-center';
import { SettingPage } from '../pages/setting/setting';
import { SupportInfoPage } from '../pages/support-info/support-info';
import { SupportSamplePage } from '../pages/support-sample/support-sample';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { ServiceIntroPage } from '../pages/service-intro/service-intro';
import { CompareQuotationPage } from '../pages/compare-quotation/compare-quotation';
import { AnalyseClientPage } from '../pages/analyse-client/analyse-client';
import { AnalyseResultPage } from '../pages/analyse-result/analyse-result';
import { MyClientPage } from '../pages/my-client/my-client';
import { ProcessStatusPage } from '../pages/process-status/process-status';
import { ProcessStatmodalPage } from '../pages/process-statmodal/process-statmodal';
import { CompanyDetailPage } from '../pages/company-detail/company-detail';
import { LoadingPage } from '../pages/loading/loading';
import { PdfViewerPage } from '../pages/pdf-viewer/pdf-viewer';
// partners
import { ChargeGuidePage } from '../pages/charge-guide/charge-guide';
import { MyinfoUpdatePage } from '../pages/myinfo-update/myinfo-update';
import { MyquotStatusPage } from '../pages/myquot-status/myquot-status';
import { MyquotInputPage } from '../pages/myquot-input/myquot-input';
import { MyquotViewPage } from '../pages/myquot-view/myquot-view';
import { MyquotProcessStatusPage } from '../pages/myquot-process-status/myquot-process-status';
import { HttpProvider } from '../providers/http/http';
import { HttpClientModule } from '@angular/common/http';

import { AppmgrProvider } from '../providers/appmgr/appmgr';
import { CommonProvider } from '../providers/common/common';
import { QuotationPage } from '../pages/quotation/quotation';
import { CurrentInstallPage } from '../pages/current-install/current-install';
import { CurrentInstallDetailPage } from '../pages/current-install-detail/current-install-detail';
import { GovernmentPage } from '../pages/government/government';
import { BenefitgeneratorPage } from '../pages/benefitgenerator/benefitgenerator';

@NgModule({
  declarations: [
    MyApp,
    FirstPage,
    HomePage,
    CalendarmodalPage,
    QuotationPage,
    ServiceIntroPage,
    CurrentInstallDetailPage,
    LoginPage,
    RegisterPage,
    RegisterAuthPage,
    FindPassPage,
    GovernmentPage,
    BenefitgeneratorPage,
    RegisterTypePage,
    TermPage,
    CustomCenterPage,
    SettingPage,
    ResetPasswordPage,
    SupportInfoPage,
    SupportSamplePage,
    CompareQuotationPage,
    CurrentInstallPage,
    AnalyseClientPage,
    AnalyseResultPage,
    MyClientPage,
    ProcessStatusPage,
    ProcessStatmodalPage,
    CompanyDetailPage,LoadingPage,
    PdfViewerPage,
    // partners
    ChargeGuidePage,
    MyinfoUpdatePage,
    MyquotStatusPage,
    MyquotInputPage,
    MyquotViewPage,
    MyquotProcessStatusPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    PdfViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FirstPage,

    GovernmentPage,
    BenefitgeneratorPage,
    CurrentInstallDetailPage,
    CurrentInstallPage,
    QuotationPage,
    HomePage,
    CalendarmodalPage,
    ServiceIntroPage,
    LoginPage,
    RegisterPage,
    RegisterAuthPage,
    FindPassPage,
    RegisterTypePage,
    TermPage,
    CustomCenterPage,
    SettingPage,
    ResetPasswordPage,
    SupportInfoPage,
    SupportSamplePage,
    CompareQuotationPage,
    AnalyseClientPage,
    AnalyseResultPage,
    MyClientPage,
    ProcessStatusPage,
    ProcessStatmodalPage,
    CompanyDetailPage,
    LoadingPage,
    PdfViewerPage,
    // partners
    ChargeGuidePage,
    MyinfoUpdatePage,
    MyquotStatusPage,
    MyquotInputPage,
    MyquotViewPage,
    MyquotProcessStatusPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpProvider,
    Diagnostic,
    FileOpener,
    CallNumber,
    AppmgrProvider,
    CommonProvider,
    PhotoViewer,
    Camera,
    OneSignal,
    NaverLogin,
    KakaoCordovaSDK,
    File,
    DocumentViewer,
    FileTransfer,
    FileTransferObject,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
