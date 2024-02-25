import { useKeyboardEvent, useLocalStorageValue } from '@react-hookz/web';
import _ from 'lodash';
import React, { useState } from 'react';
import { HiChartBar, HiRefresh } from 'react-icons/hi';
import { Board, Button, Debug, DebugButton, Footer, Keyboard } from './components';
import { DEFAULT_BOARD, GuessResult } from './constants';
import { getRandomWord, isAllowedGuess } from './wordService';

export interface GameStatus {
	active: boolean;
	gameOverMessage: string;
}

const DEFAULT_GAME_STATUS: GameStatus = { active: true, gameOverMessage: '' };

const App = () => {
	const [gameStatus, setGameStatus] = useLocalStorageValue(
		'gameStatus',
		DEFAULT_GAME_STATUS,
	);
	const [word, setWord] = useLocalStorageValue('word', getRandomWord());
	const [board, setBoard] = useLocalStorageValue('board', DEFAULT_BOARD);
	const [boardEffects, setBoardEffects] = useState(['', '', '', '', '', '']);
	const [rowIndex, setRowIndex] = useLocalStorageValue('rowIndex', 0);
	const [colIndex, setColIndex] = useLocalStorageValue('colIndex', 0);

	const updateLetter = (val: string, letterIndex: number) =>
		board.map((guess, i) =>
			guess.map((letter, j) => {
				if (i === rowIndex && j === letterIndex) return { ...letter, letter: val };
				return letter;
			}),
		);

	const checkRow = (rowIndex: number) =>
		board.map((row, i) => {
			if (i !== rowIndex) return row;
			// check each letter
			const w = word.split('');
			return row
				.map((cell, j) => {
					let result: GuessResult = 'unknown';
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

					const result: GuessResult = w.includes(cell.letter)
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
			boardEffects.map((cell, i) => (i === rowIndex ? 'animate-shake' : cell)),
		);
		setTimeout(
			() =>
				setBoardEffects((boardEffects) =>
					boardEffects.map((cell, i) => (i === rowIndex ? '' : cell)),
				),
			830,
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
					({ result }) => result === 'correct',
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

	const startNewGame = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.currentTarget.blur();
		setGameStatus(DEFAULT_GAME_STATUS);
		setBoard(DEFAULT_BOARD);
		setWord(getRandomWord());
		setRowIndex(0);
		setColIndex(0);
	};

	return (
		<div className="flex flex-col items-center h-screen gap-2 pb-2">
			<nav className="flex justify-center items-center w-screen max-w-full px-2 mb-4">
				<div className="w-1/3 flex justify-start">
					<DebugButton />
				</div>
				<div className="w-1/3 flex justify-center">
					<h1 className="text-4xl">Eordle</h1>
				</div>
				<div className="w-1/3 flex justify-end gap-2">
					<Button disabled onClick={(e) => startNewGame(e)}>
						<HiChartBar />
					</Button>
					<Button disabled={gameStatus.active} onClick={(e) => startNewGame(e)}>
						<HiRefresh />
					</Button>
				</div>
			</nav>
			{!gameStatus.active && (
				<div className="absolute top-24 p-4 rounded-lg text-2xl bg-neutral-600 shadow-2xl">
					{gameStatus.gameOverMessage}
				</div>
			)}
			<Board board={board} boardEffects={boardEffects} />
			<div className="flex-grow" />
			<Keyboard board={board} handleKey={handleKey} />
			<Debug state={{ word, rowIndex, colIndex, boardEffects, gameStatus, board }} />
			<Footer />
		</div>
	);
};

export default App;
