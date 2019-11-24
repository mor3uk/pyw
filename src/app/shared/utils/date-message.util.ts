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

  const wordsCollection = [
    '',
    'yesterday',
    '2 days ago',
    '3 days ago',
    '4 days ago',
    '5 days ago',
    '6 days ago',
    'a weak ago',
  ];

  if (wordsCollection[days]) {
    return wordsCollection[days] + ' at '
      + moment(timestemp).format('LT');
  }

  return moment(timestemp).format('L') + ' at '
    + moment(timestemp).format('LT');
};