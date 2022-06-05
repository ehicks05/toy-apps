import React from 'react';
import { IBoard, Result } from '../constants';

const resultMap = {
  unknown: `bg-neutral-900 border-neutral-600`,
  correct: 'bg-green-600 border-neutral-900',
  wrong_location: 'bg-yellow-500 border-neutral-900',
  not_present: 'bg-neutral-700 border-neutral-900',
};

interface CellProps {
  letter: string;
  result: Result;
  index?: number;
}
const Cell = ({ letter, result, index }: CellProps) => {
  const base = `flex items-center justify-center w-14 h-14 border rounded-sm text-2xl font-bold`;

  const unknownBorder = letter ? 'border-neutral-500' : 'border-neutral-600';

  // TODO: transitions work with guess result feedback but not unknown border change
  return (
    <div
      className={`${base} ${resultMap[result]} ${
        result === 'unknown' ? unknownBorder : ''
      }`}
      style={{
        transitionDelay: `${(index || 0) * 250}ms`,
        transitionProperty: 'color, background-color',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '1000ms',
      }}
    >
      {letter.toUpperCase()}
    </div>
  );
};

interface BoardProps {
  board: IBoard;
  boardEffects: string[];
}
const Board = ({ board, boardEffects }: BoardProps) => (
  <div className="flex flex-col h-full justify-center gap-1">
    {board.map((row, a) => (
      <div key={a} className={`flex gap-1 ${boardEffects[a]}`}>
        {row.map((cell, b) => (
          <Cell key={b} letter={cell.letter} result={cell.result} index={b} />
        ))}
      </div>
    ))}
  </div>
);

export default Board;
