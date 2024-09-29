// utils/dateUtils.js
import { formatDistanceToNow } from 'date-fns';

export const formatDate = (isoDateString: string) => {
  const date = new Date(isoDateString);
  // For relative time
  const relativeTime = formatDistanceToNow(date, { addSuffix: true });
  return relativeTime;
};
