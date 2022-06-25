import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskPageRoutingModule } from './task-routing.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { TaskPage } from './task.page';
import { CalendarModule } from 'ion2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskPageRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CalendarModule.forRoot({
      doneLabel: 'Save',
      closeIcon: true
    })
  ],
  declarations: [TaskPage]
})
export class TaskPageModule {}
