import { formatInTimeZone } from "date-fns-tz";

export const getTimeParts = (
  date: Date,
  tz = Intl.DateTimeFormat().resolvedOptions().timeZone
) => ({
  time: formatInTimeZone(date, tz, "h:mm"),
  ampm: formatInTimeZone(date, tz, "a"),
  date: formatInTimeZone(date, tz, "EEE, MMM dd"),
  offset: formatInTimeZone(date, tz, "XXX"),
});