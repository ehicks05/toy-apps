import React, { useState } from 'react';
import { IKeyboardEventHandler, useKeyboardEvent } from '@react-hookz/web';
import { getWord, isAllowedGuess } from './api';

const DEFAULT_ROW = [...new Array(5)].map(() => ({
  letter: '',
  result: 'unknown' as Result,
}));
const DEFAULT_BOARD = [...new Array(6)].map(() => [...DEFAULT_ROW]);

const App = () => {
  const [word, setWord] = useState(getWord());
  const [board, setBoard] = useState(DEFAULT_BOARD);
  const [boardEffects, setBoardEffects] = useState(['', '', '', '', '', '']);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);

  const updateLetter = (val: string, letterIndex: number) =>
    board.map((guess, ii) =>
      guess.map((letter, jj) => {
        if (ii === i && jj === letterIndex) return { ...letter, letter: val };
        return letter;
      })
    );

  const checkRow = (rowIndex: number) =>
    board.map((row, ii) => {
      if (ii !== rowIndex) return row;
      // check each letter
      const w = word.split('');
      return row
        .map((letter, jj) => {
          let result: Result = 'unknown';
          if (!w.includes(letter.letter)) result = 'not_present';
          else if (w[jj] === letter.letter) {
            result = 'correct';
            w[jj] = '';
          }

          console.log(`working on ${letter.letter}: ${result}`);
          return {
            ...letter,
            result,
          };
        })
        .map((letter) => {
          if (letter.result !== 'unknown') return letter;
          let result: Result;
          if (w.includes(letter.letter)) {
            result = 'wrong_location';
            const firstIndex = w.indexOf(letter.letter);
            w[firstIndex] = '';
          } else {
            result = 'not_present';
          }
          console.log(`working on ${letter.letter}: ${result}`);
          return {
            ...letter,
            result,
          };
        });
    });

  const handleKey: IKeyboardEventHandler<EventTarget> = (e: KeyboardEvent) => {
    const { key } = e;
    console.log(key);

    if (key === 'Enter' && j === 5) {
      // submit guess. todo check a word library
      const guess = board[i].map((l) => l.letter).join('');
      const isValidGuess = isAllowedGuess(guess);
      if (isValidGuess) {
        setBoard(checkRow(i));
        setI((i) => i + 1);
        setJ(0);
      } else {
        // report this
        setBoardEffects((boardEffects) =>
          boardEffects.map((cell, ii) => (ii === i ? 'animate-shake' : cell))
        );
        setTimeout(
          () =>
            setBoardEffects((boardEffects) =>
              boardEffects.map((cell, ii) => (ii === i ? '' : cell))
            ),
          830
        );
      }
    } else if (key === 'Backspace' && j > 0) {
      setBoard(updateLetter('', j - 1));
      setJ((j) => j - 1);
    } else if (/^[a-zA-Z]$/.test(key) && j < 5) {
      setBoard(updateLetter(key.toLowerCase(), j));
      setJ((j) => j + 1);
    }
  };

  useKeyboardEvent(true, handleKey);

  const newGame = (e) => {
    e.target.blur();
    setBoard(DEFAULT_BOARD);
    setWord(getWord());
    setI(0);
    setJ(0);
  };

  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <h1 className="text-4xl mb-4">Eordle</h1>

      <div className="flex flex-col gap-2">
        {board.map((row, a) => (
          <div key={a} className={`flex gap-2 ${boardEffects[a]}`}>
            {row.map((letter, b) => (
              <Letter key={b} letter={letter.letter} result={letter.result} />
            ))}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={(e) => newGame(e)}
        className="px-4 py-2 bg-green-500 text-xl rounded"
      >
        New Game
      </button>
      <Debug
        state={{
          word,
          i,
          j,
          boardEffects,
          board,
        }}
      />
    </div>
  );
};

const Debug = ({ state }: { state: any }) => (
  <pre className="text-xs">
    {JSON.stringify(
      {
        state,
      },
      null,
      2
    )}
  </pre>
);

type Result = 'unknown' | 'correct' | 'wrong_location' | 'not_present';
interface LetterProps {
  letter: string;
  result: Result;
}
const Letter = ({ letter, result }: LetterProps) => {
  const base =
    'flex items-center justify-center w-10 h-10 rounded-sm text-xl font-bold';
  const conditional = {
    unknown: 'bg-neutral-900 border border-neutral-500',
    correct: 'bg-green-500',
    wrong_location: 'bg-yellow-500',
    not_present: 'bg-neutral-700',
  };
  return (
    <div className={`${base} ${conditional[result]}`}>
      {letter.toUpperCase()}
    </div>
  );
};

export default App;
