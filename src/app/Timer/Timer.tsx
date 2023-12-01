import React, { useState } from "react";
import { Button, Card, Dialog } from "@/components";
import { HiOutlineBackspace, HiOutlineClock, HiPlus } from "react-icons/hi2";
import { BUTTON_SIZES, FONT_SIZES } from "@/constants";
import { useLocalStorage } from "usehooks-ts";
import { TimerCard } from "./TimerCard";
import { chunk } from "lodash";

const DEFAULT_INPUT = '000000';

const CreateTimerDialog = () => {
  const [, setTimers] = useLocalStorage<number[]>("timers", []);
  const [input, setInput] = useState(DEFAULT_INPUT);

  const inputToSeconds = (input: string) => {
    const [h, m, s] = inputToLabel(input).split(":");
    return Number(h) * 60 * 60 + Number(m) * 60 + Number(s);
  };

  const inputToLabel = (input: string) =>
    chunk(input.split(""), 2)
      .map((chunk) => chunk.join(""))
      .join(":");

  const handleAddTimer = () => {
    setTimers((timers) => [...timers, inputToSeconds(input)]);
    setInput(DEFAULT_INPUT);
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        className="p-2 rounded-lg text-center text-xl"
        value={inputToLabel(input)}
        readOnly
      />
      <div className="grid grid-cols-3 gap-2 w-full">
        {Array.from(Array(12)).map((_, i) => {
          const label =
            i < 9 ? (
              String(i + 1)
            ) : i === 9 ? (
              "00"
            ) : i === 10 ? (
              "0"
            ) : i === 11 ? (
              <HiOutlineBackspace size={28} />
            ) : (
              "0"
            );

          const slice = label === "00" ? [2, 8] : [1, 7];

          const onClick =
            typeof label === "string"
              ? () => setInput((input) => (input + label).slice(...slice))
              : () => setInput((input) => ("0" + input).slice(0, 6));

          return (
            <button
              key={label.toString()}
              className="flex items-center justify-center aspect-square w-full rounded-full bg-sky-900 hover:bg-sky-800"
              onClick={onClick}
            >
              {label}
            </button>
          );
        })}
      </div>
      <Button
        className="flex justify-center"
        onClick={handleAddTimer}
        disabled={input === DEFAULT_INPUT}
      >
        <HiPlus className={BUTTON_SIZES.PRIMARY} />
      </Button>
    </div>
  );
};

export const Timer = () => {
  const [timers, setTimers] = useLocalStorage<number[]>("timers", []);
  const [isCreateTimerDialogOpen, setIsCreateTimerDialogOpen] = useState(false);

  return (
    <div className="flex flex-col flex-grow items-center justify-center gap-4 px-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
        {timers.map((timer, i) => (
          <TimerCard key={timer} index={i} duration={timer} />
        ))}
      </div>

      {timers.length === 0 && (
        <Card>
          <HiOutlineClock size={96} /> Add a timer
        </Card>
      )}

      <Button
        className="flex items-center"
        onClick={() => setIsCreateTimerDialogOpen(true)}
      >
        <HiPlus className={BUTTON_SIZES.PRIMARY} />
      </Button>
      <Dialog
        isOpen={isCreateTimerDialogOpen}
        onClose={() => setIsCreateTimerDialogOpen(false)}
      >
        <CreateTimerDialog />
      </Dialog>
    </div>
  );
};
