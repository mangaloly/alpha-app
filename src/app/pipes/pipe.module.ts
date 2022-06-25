import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MyDurationPipe } from './myDurationPipe';

@NgModule({
    declarations: [MyDurationPipe],
    imports: [IonicModule],
    exports: [MyDurationPipe]
})
export class PipesModule { }