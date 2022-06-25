import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendancePageRoutingModule } from './attendance-routing.module';

import { AttendancePage } from './attendance.page';
import { CalendarModule } from 'ion2-calendar';
import { PipesModule } from 'src/app/pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendancePageRoutingModule,
    CalendarModule,
    PipesModule
  ],
  declarations: [AttendancePage]
})
export class AttendancePageModule {}
