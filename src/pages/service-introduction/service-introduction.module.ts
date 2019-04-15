import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceIntroductionPage } from './service-introduction';

@NgModule({
  declarations: [
    ServiceIntroductionPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceIntroductionPage),
  ],
})
export class ServiceIntroductionPageModule {}
