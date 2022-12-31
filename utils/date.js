import { format } from 'date-fns';
const dateTime = '2019-01-01T12:00:00.000Z';
export const formatDate = (serializedDateTime) => {
  const date = serializedDateTime.split('T')[0];
  const [year, month, day] = date.split('-');
  return `${month}/${day}/${year}`;
};
export const formatTime = (serializedDateTime) => {
  const split = serializedDateTime.split('T');

  const time = split[1];
  return time;
};

export const getDuration = (start, end) => {
  const startDate = formatDate(start);
  const endDate = formatDate(end);
  const startTime = formatTime(start);
  const endTime = formatTime(end);

  const startDateObject = new Date(startDate + ' ' + startTime);
  const endDateObject = new Date(endDate + ' ' + endTime);
  const timeDifference = endDateObject - startDateObject;
  const differenceObject = new Date(timeDifference);
  const hours = differenceObject.getHours();
  const minutes = differenceObject.getMinutes();

  return `${hours}h ${minutes}m`;
};
