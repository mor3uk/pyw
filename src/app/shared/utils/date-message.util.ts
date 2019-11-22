export const generateDateMessage = (date): string => {
  return 'Added on ' +
    date.format('DD MMMM') +
    ' at ' + date.format('LT');
}