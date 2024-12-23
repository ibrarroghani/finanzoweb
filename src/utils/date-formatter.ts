import { format } from 'date-fns';

export const convertDateToString = (date: Date) => {
  const convertedDate = format(date, 'd MMMM yyyy');
  return convertedDate;
};

export const convertDateApiFormat = (date: Date) => {
  const convertedDate = format(date, 'yyyy-MM-dd');
  return convertedDate;
};

export const getTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1); // Set the date to tomorrow
  tomorrow.setHours(0, 0, 0, 0); // Reset time to avoid time mismatch
  return tomorrow;
};
