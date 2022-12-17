import { Timestamp } from "../types/posts";

export const convertTimestampToDate = (timestamp: Timestamp) => {
  const date = new Date(timestamp.seconds * 1000);
  const month = date.getUTCMonth() + 1; //months from 1-12
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  const time = `${day}/${month}/${year}`;
  return time;
};
