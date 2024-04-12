import moment from 'moment';

export const getTimeDifference = (timestamp: string) => {
   const now = moment();
   const postTime = moment(new Date(timestamp));

   const minutesDiff = now.diff(postTime, 'minutes');
   const hoursDiff = now.diff(postTime, 'hours');
   const daysDiff = now.diff(postTime, 'days');

   if (minutesDiff < 60) {
      return `${minutesDiff} ${minutesDiff === 1 ? 'minute' : 'minutes'} ago`;
   } else if (hoursDiff < 24) {
      return `${hoursDiff} ${hoursDiff === 1 ? 'hour' : 'hours'} ago`;
   } else {
      return `${daysDiff} ${daysDiff === 1 ? 'day' : 'days'} ago`;
   }
};
