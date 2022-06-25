import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotiPageRoutingModule } from './noti-routing.module';

import { NotiPage } from './noti.page';
import {TimeAgoPipe} from 'time-ago-pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotiPageRoutingModule
  ],
  declarations: [NotiPage,TimeAgoPipe]
})
export class NotiPageModule {}
