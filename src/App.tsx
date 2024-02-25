import { useKeyboardEvent, useLocalStorageValue } from '@react-hookz/web';
import _ from 'lodash';
import React, { useState } from 'react';
import { HiChartBar, HiRefresh } from 'react-icons/hi';
import {
	BoardView,
	Button,
	Debug,
	DebugButton,
	Footer,
	Keyboard,
} from './components';
import { DEFAULT_BOARD, DEFAULT_GAME, DEFAULT_STATUS } from './constants';
import { Board, Cell, GuessResult, Row } from './types';
import { getRandomWord, isAllowedGuess } from './wordService';

const getCell = (board: Board, rowIndex: number, cellIndex: number) =>
	board.rows[rowIndex].cells[cellIndex];

const updateCell = (
	board: Board,
	rowIndex: number,
	cellIndex: number,
	updatedCell: Cell,
) => {
	return {
		...board,
		rows: board.rows.map((row, i) =>
			i === rowIndex
				? {
						...row,
						cells: row.cells.map((cell, j) =>
							j === cellIndex ? updatedCell : cell,
						),
				  }
				: row,
		),
	};
};

const App = () => {
	const [gameStatus, setGameStatus] = useLocalStorageValue(
		'gameStatus',
		DEFAULT_GAME.status,
	);
	const [word, setWord] = useLocalStorageValue('word', getRandomWord());
	const [board, setBoard] = useLocalStorageValue('board', DEFAULT_GAME.board);
	const [boardEffects, setBoardEffects] = useState(['', '', '', '', '', '']);
	const [rowIndex, setRowIndex] = useLocalStorageValue('rowIndex', 0);
	const [colIndex, setColIndex] = useLocalStorageValue('colIndex', 0);

	const checkRow = (row: Row) => {
		// check each letter
		const w = word.split('');
		const checkedCells: Cell[] = row.cells
			// first check for `not_present` and `correct`
			// `correct` matches eliminate that letter from `w` so it can't be matched again
			.map((cell, i) => {
				let result: GuessResult = 'unknown';
				if (!w.includes(cell.letter)) result = 'not_present';
				else if (w[i] === cell.letter) {
					result = 'correct';
					w[i] = '';
				}

				return { ...cell, result };
			})
			.map((cell) => {
				if (cell.result !== 'unknown') return cell;

				const result: GuessResult = w.includes(cell.letter)
					? 'wrong_location'
					: 'not_present';
				if (result === 'wrong_location') {
					w[w.indexOf(cell.letter)] = '';
				}

				return { ...cell, result };
			});

		return { ...row, cells: checkedCells };
	};

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
			const guess = board.rows[rowIndex].cells.map((cell) => cell.letter).join('');
			const isValidGuess = isAllowedGuess(guess);
			if (isValidGuess) {
				const checkedRow = checkRow(board.rows[rowIndex]);
				setBoard({
					...board,
					rows: board.rows.map((row, i) => (i === rowIndex ? checkedRow : row)),
				});

				const isCorrect = checkedRow.cells.every(
					(cell) => cell.result === 'correct',
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
			const cell = getCell(board, rowIndex, colIndex - 1);
			setBoard(
				updateCell(board, rowIndex, colIndex - 1, {
					...cell,
					letter: '',
				}),
			);
			setColIndex((j) => j - 1);
		} else if (/^[a-zA-Z]$/.test(key) && colIndex < 5) {
			const cell = getCell(board, rowIndex, colIndex);
			setBoard(
				updateCell(board, rowIndex, colIndex, {
					...cell,
					letter: key.toLowerCase(),
				}),
			);
			setColIndex((j) => j + 1);
		}
	};

	useKeyboardEvent(true, (e) => {
		const { key } = e;
		handleKey(key);
	});

	const startNewGame = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.currentTarget.blur();
		setGameStatus(DEFAULT_STATUS);
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
			<BoardView board={board} boardEffects={boardEffects} />
			<div className="flex-grow" />
			<Keyboard board={board} handleKey={handleKey} />
			<Debug state={{ word, rowIndex, colIndex, boardEffects, gameStatus, board }} />
			<Footer />
		</div>
	);
};

export default App;
