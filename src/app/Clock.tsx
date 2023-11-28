import React from "react";
import { useClock } from "@/hooks";
import { format } from "date-fns";

const FONT_SIZES = {
  PRIMARY: "text-8xl sm:text-9xl",
  SECONDARY: "text-3xl sm:text-4xl md:text-5xl",
};

const Clock = () => {
  const { date: _date } = useClock();
  const time = format(_date, "h:mm");
  const ampm = format(_date, "a");
  const date = format(_date, "EEE, MMM dd");

  return (
    <div className="flex flex-col flex-grow items-center justify-center gap-4">
      <div className={`flex items-baseline gap-2`}>
        <div className={FONT_SIZES.PRIMARY}>{time}</div>
        <div className={FONT_SIZES.SECONDARY}>{ampm}</div>
      </div>
      <div className={FONT_SIZES.SECONDARY}>{date}</div>
    </div>
  );
}

export default Clock;
