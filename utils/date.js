import { format } from 'date-fns';

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
