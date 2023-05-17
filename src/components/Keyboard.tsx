import React from 'react';
import { HiOutlineBackspace } from 'react-icons/hi';
import { Result, IBoard } from '../constants';

const KEYS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
];

const getLetterResults = (board: IBoard) =>
  board
    .flat()
    .sort(
      ({ result: r1 }, { result: r2 }) =>
        RESULT_PRIORITIES[r2] - RESULT_PRIORITIES[r1]
    )
    .reduce(
      (agg, curr) => ({ ...agg, [curr.letter]: curr.result }),
      {} as Record<string, Result>
    );

const kbResultMap = {
  not_present: `bg-neutral-700`,
  correct: 'bg-green-600 duration-1000',
  wrong_location: 'bg-yellow-500 duration-1000',
  unknown: 'bg-neutral-500 duration-700',
};

const RESULT_PRIORITIES: Record<Result, number> = {
  correct: 0,
  wrong_location: 1,
  not_present: 2,
  unknown: 3,
};

interface KbKeyProps {
  kbKey: string;
  letterResult: Result;
  handleKey: (key: string) => void;
}
const KbKey = ({ kbKey, letterResult, handleKey }: KbKeyProps) => {
  const renderKey =
    kbKey === 'Backspace' ? (
      <HiOutlineBackspace size={24} />
    ) : (
      kbKey.toUpperCase()
    );
  const base =
    'flex items-center justify-center p-2 sm:p-3 md:p-4 h-full rounded text-sm font-bold';
  const resultStyle = kbResultMap[letterResult || 'unknown'];
  return (
    <button
      type="button"
      className={`${base} ${resultStyle}`}
      onClick={(e) => {
        e.currentTarget.blur();
        handleKey(kbKey);
      }}
    >
      {renderKey}
    </button>
  );
};

interface KeyboardProps {
  board: IBoard;
  handleKey: (key: string) => void;
}
const Keyboard = ({ board, handleKey }: KeyboardProps) => {
  const letterResults = getLetterResults(board);
  return (
    <div className="flex flex-col gap-1.5 w-screen max-w-full h-52">
      {KEYS.map((row) => (
        <div className="flex justify-center gap-1.5 h-full">
          {row.map((key) => (
            <KbKey
              kbKey={key}
              letterResult={letterResults[key]}
              handleKey={handleKey}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
