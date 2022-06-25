import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { LoginComponent } from '../pages/login/login.component';
import { UserService } from './user';

@Injectable({ providedIn: 'root' })
export class LoginActivate implements CanActivate {
    constructor(private user: UserService, public modalCtrl: ModalController, public router: Router,
        public navCtrl: NavController) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        console.log("wwwwwwwwwwwww")

         console.log("eeeeeeeeeeeeeeeee")
 
            if (!this.user.hasLoggedIn) {
                console.log('Not logged in ');
                this.presentLogin(state.url)
            } else {
                return true;
            }
          
        
       

    }
    async presentLogin(redirectUrl:any=null) {
        const modal = await this.modalCtrl.create({
            component: LoginComponent,
            componentProps: { data: { redirectUrl: redirectUrl } }
        });
        await modal.present();

        await modal.onWillDismiss().then((data) => {
            console.log(data)
            if (data.data && data.data.loginSuccess) {
                console.log(redirectUrl)
                if (redirectUrl) this.router.navigateByUrl(redirectUrl);
            } else {
                this.navCtrl.setDirection('back')
            }
        })
    }

}