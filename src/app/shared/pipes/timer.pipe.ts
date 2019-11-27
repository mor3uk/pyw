import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timer'
})
export class TimerPipe implements PipeTransform {
  transform(seconds): string {
    const date = new Date(null);
    const iStart = seconds >= 3600 ? 11 : 14;
    const iEnd = seconds >= 3600 ? 8 : 5;

    date.setSeconds(seconds);
    return date.toISOString().substr(iStart, iEnd);
  }
}
