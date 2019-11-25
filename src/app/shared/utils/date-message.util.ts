import moment from 'moment';

export const generateDateMessage = (timestemp: number): string => {
  const dayMs = 3600 * 24 * 1000;
  const currentMs = +new Date();

  const days = Math.floor((currentMs - timestemp) / dayMs);

  if (days === 0) {
    const hourMs = 3600 * 1000;
    const hours = Math.floor((currentMs - timestemp) / hourMs);

    if (hours === 0) {
      const minuteMs = 60 * 1000;
      const minutes = Math.floor((currentMs - timestemp) / minuteMs);

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

  const timeConstant = ' at ' + moment(timestemp).format('LT');

  if (days === 1) {
    return '1 day ago' + timeConstant;
  }

  if (days < 7) {
    return days + ' days ago' + timeConstant
  }

  if (days === 7) {
    return 'a week ago ' + timeConstant;
  }

  return moment(timestemp).format('L') + ' at '
    + moment(timestemp).format('LT');
};