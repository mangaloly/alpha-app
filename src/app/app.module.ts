import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { Camera } from '@ionic-native/camera/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { DatePipe } from '@angular/common';
import { LeaveRequestFormComponent } from './pages/leave-request-form/leave-request-form.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { CalendarModule } from 'ion2-calendar';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import { SpinnersAngularModule } from 'spinners-angular';
import {TimeAgoPipe} from 'time-ago-pipe';
import { ChartsModule } from 'ng2-charts';
import { PipesModule } from './pipes/pipe.module';






@NgModule({
    declarations: [AppComponent, LoginComponent, LeaveRequestFormComponent,ForgetPasswordComponent,EditProfileComponent,TimeAgoPipe],
    entryComponents:[ForgetPasswordComponent,EditProfileComponent],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        OwlDateTimeModule,
         OwlNativeDateTimeModule,
         BrowserAnimationsModule,
         ChartsModule,
         PipesModule,
        //  SpinnersAngularModule,
        CalendarModule.forRoot({
            doneLabel: 'Save',
            closeIcon: true
          })],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ,
        Camera,
        AndroidPermissions,
        File,
        FileTransfer,
        DatePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
