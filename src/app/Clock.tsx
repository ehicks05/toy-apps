import React from "react";
import { useClock } from "@/hooks";
import { format } from "date-fns";

  const primaryFontSizes =
    "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl";
  const secondaryFontSizes =
    "text-base sm:text-lg md:text-xl lg:text-2xl xl:text-4xl";

const Clock = () => {
  const { date: _date } = useClock();
  const time = format(_date, "h:mm");
  const ampm = format(_date, "a");
  const date = format(_date, "EEE, MMM dd");

  return (
    <div className="flex flex-col flex-grow items-center justify-center gap-4">
      <div className={`flex items-baseline gap-2`}>
        <div className={primaryFontSizes}>{time}</div>
        <div className={secondaryFontSizes}>{ampm}</div>
      </div>
      <div className={secondaryFontSizes}>{date}</div>
    </div>
  );
}

export default Clock;
