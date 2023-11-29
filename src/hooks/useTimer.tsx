import { useState, useRef, useEffect } from "react";

interface Props {
  hours?: number;
  minutes?: number;
  seconds?: number;
}

const nf = Intl.NumberFormat("en-US", {
  // minimumIntegerDigits: 2,
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const formatTime = (
  _ms: number,
) => {
  const ms = Math.abs(_ms);
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor(ms / (1000 * 60)) % 60;
  const seconds = nf.format((ms / 1000) % 60);
  const joined = [
    ...(hours ? [hours] : []),
    ...(hours || minutes ? [minutes] : []),
    seconds,
  ]
    .map((x) => String(x).padStart(2, "0"))
    .join(":");
  
  return `${_ms < 0 ? "-" : ""}${joined}`;
};

const TIME_STEP = 16;

export const useTimer = (props: Props) => {
  let initialMs =
    (props?.seconds || 0) * 1000 +
    (props?.minutes || 0) * 1000 * 60 +
    (props?.hours || 0) * 1000 * 60 * 60;

  const [ms, setMs] = useState(initialMs);
  const [paused, setPaused] = useState(true);
  const [expired, setExpired] = useState(false);

  const msRef = useRef(ms);
  const interval = useRef(0);

  useEffect(() => {
    msRef.current = ms;

    if (ms <= 0) {
      setExpired(true);
    }
  }, [ms]);

  useEffect(() => {
    function startTimer() {
      function decrement() {
        setMs(msRef.current - TIME_STEP * 100);
      }

      interval.current = window.setInterval(decrement, TIME_STEP);
    }

    paused ? clearInterval(interval.current) : startTimer();

    return () => clearInterval(interval.current);
  }, [paused]);

  function reset() {
    setMs(initialMs);
    setExpired(false);
    setPaused(true);
  }

  function updateMinutes(amount: number) {
    const addedMs = amount * 60 * 1000;
    initialMs += addedMs;
    setMs(ms + addedMs);
  }

  const hasTimeElapsed = ms !== initialMs;

  return {
    ms,
    paused,
    expired,
    setPaused,
    hasTimeElapsed,
    reset,
    formattedTime: formatTime(ms),
    percent: expired ? 0 : (ms / initialMs) * 100,
    updateMinutes,
  };
};
