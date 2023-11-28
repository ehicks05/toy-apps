import React from "react";
import { Button } from "@/components";
import { useTimer } from "@/hooks/useTimer";
import { HiPause, HiPlay, HiPlus } from "react-icons/hi";
import { BUTTON_SIZES, FONT_SIZES } from "@/constants";
import { MdRestartAlt } from "react-icons/md";

const Timer = () => {
  const {
    paused,
    expired,
    setPaused,
    hasTimeElapsed,
    reset,
    displayTime,
    updateMinutes,
  } = useTimer({ minutes: 5 });

  return (
    <div className="flex flex-col gap-4 flex-grow items-center justify-center">
      <div className={FONT_SIZES.PRIMARY}>{displayTime}</div>
      <div className="flex gap-4">
        {!expired && (
          <>
            {hasTimeElapsed && (
              <Button className="flex items-center" onClick={() => updateMinutes(1)}>
                <HiPlus className={BUTTON_SIZES.PRIMARY} />
                <span className={FONT_SIZES.SECONDARY}>
                1:00
                </span>
              </Button>
            )}
            <Button onClick={() => setPaused(!paused)}>
              {paused ? (
                <HiPlay className={BUTTON_SIZES.PRIMARY} />
              ) : (
                <HiPause className={BUTTON_SIZES.PRIMARY} />
              )}
            </Button>
          </>
        )}
        {hasTimeElapsed && (
          <Button onClick={() => reset()}>
            <MdRestartAlt className={BUTTON_SIZES.SECONDARY} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Timer;
