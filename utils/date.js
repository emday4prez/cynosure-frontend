import { format } from 'date-fns';

export const formatDateTime = (serializedDateTime) => {
  const split = serializedDateTime.split('T');

  const date = format(new Date(split[0]), 'MMMM d, yyyy');
  const time = split[1].slice(0, 5);
  return `${date} at ${time}`;
};
