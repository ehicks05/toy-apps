import { useState, useRef, useEffect } from "react";

const DEFAULT_MS = 0;
const TIME_STEP = 1;

const formatTime = (ms: number) =>
  [
    Math.floor(ms / (1000 * 60 * 60)),
    Math.floor(ms / (1000 * 60)) % 60,
    Math.floor(ms / 1000) % 60,
  ]
    .map((x) => String(x).padStart(2, "0"))
    .join(":") + `.${ms % 1000}`.padEnd(4, "0");

interface Lap {
  lapNumber: number;
  lapTime: number;
  totalTime: number;
}

export const useStopwatch = () => {
  const [ms, setMs] = useState(DEFAULT_MS);
  const [laps, setLaps] = useState<Lap[]>([]);
  const [paused, setPaused] = useState(true);
  const interval = useRef(0);

  /**
   * Handle pause / unpause
   */
  useEffect(() => {
    function startTimer() {
      interval.current = window.setInterval(
        () => setMs((ms) => ms + TIME_STEP),
        TIME_STEP
      );
    }

    paused ? clearInterval(interval.current) : startTimer();

    return () => clearInterval(interval.current);
  }, [paused]);

  const reset = () => {
    setMs(DEFAULT_MS);
    setPaused(true);
    setLaps([]);
  }

  const addLap = () =>
    setLaps([
      {
        lapNumber: laps.length + 1,
        lapTime: ms - (laps.length > 0 ? laps[0].totalTime : 0),
        totalTime: ms,
      },
      ...laps,
    ]);

  return {
    ms,
    laps,
    hasTimeElapsed: ms !== DEFAULT_MS,
    displayTime: formatTime(ms),
    paused,
    setPaused,
    reset,
    addLap,
    formatTime,
  };
};
