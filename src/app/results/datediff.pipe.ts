import { Pipe, PipeTransform } from '@angular/core';

import moment from 'moment';

@Pipe({
  name: 'datediff',
})
export class DatediffPipe implements PipeTransform {
  transform(timestamp: number): string {
    const currentDate = moment();
    const passedDate = moment(timestamp);

    const days = currentDate.diff(passedDate, 'days');

    if (days === 0) {
      const hours = currentDate.diff(passedDate, 'hours');

      if (hours === 0) {
        const minutes = currentDate.diff(passedDate, 'minutes');

        if (minutes < 2) {
          return '1 minute ago';
        }

        return minutes + ' minutes ago';
      }

      if (hours === 1) {
        return '1 hour ago';
      }

      return hours + ' hours ago';
    }

    const timeConstant = ' at ' + passedDate.format('LT');

    if (days === 1) {
      return '1 day ago' + timeConstant;
    }

    if (days < 7) {
      return days + ' days ago' + timeConstant
    }

    if (days === 7) {
      return 'a week ago ' + timeConstant;
    }

    return passedDate.format('L') + ' at '
      + passedDate.format('LT');
  }
}
