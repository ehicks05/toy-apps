import React from "react";
import { Button } from "@/components";
import clsx from "clsx";
import { useTimer } from "@/hooks/useTimer";
import { HiPlus } from "react-icons/hi";

interface Props {
  minutes: number;
}

function Timer({ minutes }: Props) {
  const {
    paused,
    expired,
    setPaused,
    hasTimeElapsed,
    reset,
    displayTime,
    updateMinutes,
  } = useTimer({ minutes: 5 });
  const isShowResetButton = paused && hasTimeElapsed;

  const textSize = "text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl";
  return (
    <div className="flex flex-grow items-center justify-center">
      <div className={textSize}>
        {displayTime}
      </div>
      {!expired && (
        <>
          <Button
            className={`rounded-none` + textSize}
            onClick={() => updateMinutes(1)}
          >
            <HiPlus />
          </Button>
          <Button
            className={
              `rounded-l-none ${isShowResetButton ? "rounded-r-none" : ""}` +
              textSize
            }
            onClick={() => setPaused(!paused)}
          >
            {isShowResetButton ? "Resume" : paused ? "Start" : "Pause"}
          </Button>
        </>
      )}
      {isShowResetButton && (
        <Button className={`rounded-l-none` + textSize} onClick={() => reset()}>
          Reset
        </Button>
      )}
    </div>
  );
}

export default Timer;
