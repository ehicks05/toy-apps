import React, { useState } from 'react';
import { IKeyboardEventHandler, useKeyboardEvent } from '@react-hookz/web'; // cjs

const DEFAULT_ROW = [...new Array(5)].map(() => '');
const DEFAULT_BOARD = [...new Array(6)].map(() => [...DEFAULT_ROW]);

const App = () => {
  const word = 'valor';
  const [guesses, setGuesses] = useState(DEFAULT_BOARD);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);

  const updateGuesses = (val) => guesses.map((guess, ii) => guess.map((letter, jj) => {
    if (ii === i && jj === j) return val;
    return letter;
  }));

  const handleKey: IKeyboardEventHandler<EventTarget> = (e: KeyboardEvent) => {
    const { key } = e;
    console.log(key);

    if (key === 'Enter' && guesses[i].length === 5) {
      // submit guess. todo check a word library
      setI((i) => i + 1);
    } else if (key === 'Backspace' && j > 0) {
      setJ((j) => j - 1);
      setGuesses(updateGuesses(''));
    } else if (/^[a-zA-Z]/.test(key) && j < 5) {
      setGuesses(updateGuesses(key));
      setJ((j) => j + 1);
    }
  };

  useKeyboardEvent(true, handleKey);

  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <h1 className="text-4xl mb-4">Eordle</h1>

      {guesses.map((guess, a) => (
        <div key={a} className="flex gap-2">
          {guess.map((letter, b) => (
            <div
              key={b}
              className="flex items-center justify-center w-10 h-10 bg-neutral-900 border border-neutral-500 rounded"
            >
              {letter}
            </div>
          ))}
        </div>
      ))}

      <pre className="text-xs">
        {JSON.stringify(
          { guesses, 'guesses[i].length': guesses[i].length },
          null,
          2,
        )}
      </pre>
    </div>
  );
};

export default App;
