import React from "react";
import { Button } from "@/components";
import { HiPause, HiPlay } from "react-icons/hi";
import { useStopwatch } from "@/hooks";
import { BiStopwatch } from "react-icons/bi";

function Stopwatch() {
  const {
    laps,
    paused,
    setPaused,
    hasTimeElapsed,
    reset,
    displayTime,
    addLap,
    formatTime,
  } = useStopwatch();

  return (
    <div className="flex flex-col flex-grow items-center justify-center gap-4">
      <div className="">{displayTime}</div>
      <table>
        <tbody>
          {laps.map((lap, i) => (
            <tr key={i}>
              <td className="px-4">#{lap.lapNumber}</td>
              <td className="px-4">{formatTime(lap.lapTime)}</td>
              <td className="px-4">{formatTime(lap.totalTime)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-8">
        <Button onClick={() => setPaused(!paused)}>
          {paused ? <HiPlay size={32} /> : <HiPause size={32} />}
        </Button>
        {hasTimeElapsed && <Button onClick={reset}>Reset</Button>}
        {hasTimeElapsed && (
          <Button onClick={addLap}>
            <BiStopwatch size={32} />
          </Button>
        )}
      </div>
    </div>
  );
}

export default Stopwatch;
