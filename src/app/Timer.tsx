import React from "react";
import { Button, Card } from "@/components";
import { useTimer } from "@/hooks/useTimer";
import { HiPause, HiPlay, HiPlus } from "react-icons/hi2";
import { BUTTON_SIZES, FONT_SIZES } from "@/constants";
import { MdRestartAlt, MdPlayArrow, MdPause } from "react-icons/md";
import ProgressBar from "@/components/ProgressBar";
import { useWindowSize } from "usehooks-ts";

const Timer = () => {
  const {
    paused,
    expired,
    setPaused,
    hasTimeElapsed,
    reset,
    formattedTime,
    percent,
    updateMinutes,
  } = useTimer({ seconds: 2 });

  const { width } = useWindowSize();

  return (
    <div className="flex flex-col gap-4 flex-grow items-center justify-center font-mono">
      <Card>
        <div className="text-4xl">Under Construction</div>
        Todo:
        <ol className="list-decimal">
          <li>Input</li>
          <li>timer end sound and/or visuals</li>
        </ol>
      </Card>
      <div className={FONT_SIZES.PRIMARY}>
        <ProgressBar
          size={
            width < 640
              ? 300
              : width < 768
                ? 350
                : width < 1024
                  ? 400
                  : width < 1280
                    ? 500
                    : 600
          }
          progress={percent}
          label={formattedTime}
        />
      </div>
      <div className="flex gap-4">
        {!expired && (
          <>
            {hasTimeElapsed && (
              <Button
                className="flex items-center"
                onClick={() => updateMinutes(1)}
              >
                <HiPlus className={BUTTON_SIZES.PRIMARY} />
              </Button>
            )}
            <Button onClick={() => setPaused(!paused)}>
              {paused ? (
                <MdPlayArrow className={BUTTON_SIZES.PRIMARY} />
              ) : (
                <MdPause className={BUTTON_SIZES.PRIMARY} />
              )}
            </Button>
          </>
        )}
        {hasTimeElapsed && (
          <Button onClick={() => reset()}>
            <MdRestartAlt className={BUTTON_SIZES.PRIMARY} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Timer;
