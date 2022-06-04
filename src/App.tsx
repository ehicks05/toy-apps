import React, { useState } from 'react';
import { useKeyboardEvent, useLocalStorageValue } from '@react-hookz/web';
import _ from 'lodash';
import { getWord, isAllowedGuess } from './api';
import { DEFAULT_BOARD, Result } from './constants';
import { Board, Button, Debug, Keyboard } from './components';

const App = () => {
  const [gameStatus, setGameStatus] = useLocalStorageValue('gameStatus', {
    active: true,
    gameOverMessage: '',
  });
  const [word, setWord] = useLocalStorageValue('word', getWord());
  const [board, setBoard] = useLocalStorageValue('board', DEFAULT_BOARD);
  const [boardEffects, setBoardEffects] = useState(['', '', '', '', '', '']);
  const [rowIndex, setRowIndex] = useLocalStorageValue('rowIndex', 0);
  const [colIndex, setColIndex] = useLocalStorageValue('colIndex', 0);

  const updateLetter = (val: string, letterIndex: number) =>
    board.map((guess, i) =>
      guess.map((letter, j) => {
        if (i === rowIndex && j === letterIndex)
          return { ...letter, letter: val };
        return letter;
      })
    );

  const checkRow = (rowIndex: number) =>
    board.map((row, i) => {
      if (i !== rowIndex) return row;
      // check each letter
      const w = word.split('');
      return row
        .map((cell, j) => {
          let result: Result = 'unknown';
          if (!w.includes(cell.letter)) result = 'not_present';
          else if (w[j] === cell.letter) {
            result = 'correct';
            w[j] = '';
          }

          return {
            ...cell,
            result,
          };
        })
        .map((cell) => {
          if (cell.result !== 'unknown') return cell;

          const result: Result = w.includes(cell.letter)
            ? 'wrong_location'
            : 'not_present';
          if (result === 'wrong_location') {
            w[w.indexOf(cell.letter)] = '';
          }

          return {
            ...cell,
            result,
          };
        });
    });

  const handleInvalidGuess = () => {
    setBoardEffects((boardEffects) =>
      boardEffects.map((cell, i) => (i === rowIndex ? 'animate-shake' : cell))
    );
    setTimeout(
      () =>
        setBoardEffects((boardEffects) =>
          boardEffects.map((cell, i) => (i === rowIndex ? '' : cell))
        ),
      830
    );
  };

  const handleKey = (key: string) => {
    if (!gameStatus.active) return;
    console.log(key);

    if (key === 'Enter' && colIndex === 5) {
      const guess = board[rowIndex].map((cell) => cell.letter).join('');
      const isValidGuess = isAllowedGuess(guess);
      if (isValidGuess) {
        const updatedBoard = checkRow(rowIndex);
        setBoard(updatedBoard);

        const isCorrect = _.every(
          updatedBoard[rowIndex],
          ({ result }) => result === 'correct'
        );
        if (isCorrect) {
          setGameStatus({ active: false, gameOverMessage: 'Great job!' });
        }
        if (!isCorrect && rowIndex === 5) {
          setGameStatus({ active: false, gameOverMessage: 'Sorry!' });
        }

        setRowIndex((i) => i + 1);
        setColIndex(0);
      } else {
        handleInvalidGuess();
      }
    } else if (key === 'Backspace' && colIndex > 0) {
      setBoard(updateLetter('', colIndex - 1));
      setColIndex((j) => j - 1);
    } else if (/^[a-zA-Z]$/.test(key) && colIndex < 5) {
      setBoard(updateLetter(key.toLowerCase(), colIndex));
      setColIndex((j) => j + 1);
    }
  };

  useKeyboardEvent(true, (e) => {
    const { key } = e;
    handleKey(key);
  });

  const newGame = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    setGameStatus({ active: true, gameOverMessage: '' });
    setBoard(DEFAULT_BOARD);
    setWord(getWord());
    setRowIndex(0);
    setColIndex(0);
  };

  return (
    <div className="flex flex-col items-center h-screen gap-4 p-2">
      <h1 className="text-4xl my-4">Eordle</h1>
      {!gameStatus.active && (
        <div className="absolute top-24 p-4 rounded-lg text-2xl bg-neutral-600 shadow-2xl">
          {gameStatus.gameOverMessage}
        </div>
      )}
      <Board board={board} boardEffects={boardEffects} />
      <Button disabled={gameStatus.active} onClick={(e) => newGame(e)}>
        New Game
      </Button>
      <div className="flex-grow" />
      <Keyboard board={board} handleKey={handleKey} />
      <Debug
        state={{ word, rowIndex, colIndex, boardEffects, gameStatus, board }}
      />
    </div>
  );
};

export default App;
