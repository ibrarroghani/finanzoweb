import { format } from 'date-fns';

export const convertDateToString = (date: Date) => {
  const convertedDate = format(date, 'd MMMM yyyy');
  return convertedDate;
};
