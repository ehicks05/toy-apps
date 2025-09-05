import { format } from "date-fns";
import { tz, tzOffset } from "@date-fns/tz";

export const getTimeParts = (
  date: Date,
  _tz = Intl.DateTimeFormat().resolvedOptions().timeZone
) => ({
  time: format(date, "h:mm", { in: tz(_tz) }),
  ampm: format(date, "a", { in: tz(_tz) }),
  date: format(date, "EEE, MMM dd", { in: tz(_tz) }),
  offset: format(date, "XXX", { in: tz(_tz) }),
});

// get offset relative to browser
// sample result: '+14h tomorrow'
export const getRelativeOffset = (timeZoneId: string) => {
  const offsetMinutes =
    tzOffset(timeZoneId, new Date()) -
    tzOffset(Intl.DateTimeFormat().resolvedOptions().timeZone, new Date());
  const hour = Math.floor(offsetMinutes / 60);
  const minute = offsetMinutes % 60;

  const sign = offsetMinutes > 0 ? "+" : "";
  const h = `${hour}h`;
  const m = minute ? ` ${minute}m` : "";

  const offset = `${sign}${h}${m}`;

  const localDate = format(new Date(), "dd");
  const nonLocalDate2 = format(new Date(), "dd", { in: tz(timeZoneId) });

  const relativeDate =
    nonLocalDate2 > localDate
      ? " tomorrow"
      : nonLocalDate2 < localDate
        ? " yesterday"
        : "";

  return `${offset}${relativeDate}`;
};