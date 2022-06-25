import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'myDuration'
})
@Injectable({ providedIn: 'root' })
export class MyDurationPipe implements PipeTransform {

    transform(value): string {
        value=parseInt(value)
        if (!value) return null
        var hours: any = Math.floor(value / 3600);
        var minutes: any = Math.floor((value - (hours * 3600)) / 60);
        var seconds: any = value - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return ((hours>0) ? (hours + ':'):'') + minutes + ':' + seconds;
    }


}