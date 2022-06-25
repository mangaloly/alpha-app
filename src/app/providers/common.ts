import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";



@Injectable({ providedIn: 'root' })
export class CommonService {

    PUNCH_STATUS="punch_status"
    punch_status:any;
    punch_in_time:any;
    PUNCH_IN_TIME="punch_in_time"
    left_time:any=0;
    is_loader:boolean=false
    
    constructor(public toastCtrl:ToastController){

    }

    async  presentToast(msg) {
        const toast = await this.toastCtrl.create({
            message: msg,
            position: 'bottom',
            duration: 2000
        });
        toast.present();
    }
}