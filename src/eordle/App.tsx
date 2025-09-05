import { useState } from 'react';
import { HiChartBar, HiRefresh } from 'react-icons/hi';
import { useLocalStorage } from 'usehooks-ts';
import { checkRow, getCell, updateCell } from './boardService';
import {
	BoardView,
	Button,
	Debug,
	DebugButton,
	Footer,
	Keyboard,
} from './components';
import { DEFAULT_GAME } from './constants';
import { getRandomWord, isAllowedGuess } from './wordService';
import { useKeyPress } from './useKeyPress';

const App = () => {
	const [gameStatus, setGameStatus] = useLocalStorage(
		'gameStatus',
		DEFAULT_GAME.status,
	);
	const [word, setWord] = useLocalStorage('word', getRandomWord());
	const [board, setBoard] = useLocalStorage('board', DEFAULT_GAME.board);
	const [boardEffects, setBoardEffects] = useState(['', '', '', '', '', '']);
	const [rowIndex, setRowIndex] = useLocalStorage('rowIndex', 0);
	const [colIndex, setColIndex] = useLocalStorage('colIndex', 0);

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
			if (!isValidGuess) {
				handleInvalidGuess();
				return;
			}

			const checkedRow = checkRow(board.rows[rowIndex], word);
			setBoard({
				...board,
				rows: board.rows.map((row, i) => (i === rowIndex ? checkedRow : row)),
			});

			const isCorrect = checkedRow.cells.every((cell) => cell.result === 'correct');

			if (isCorrect) {
				setGameStatus({ active: false, gameOverMessage: 'Great job!' });
			}
			if (!isCorrect && rowIndex === 5) {
				setGameStatus({
					active: false,
					gameOverMessage: `Sorry! The word was ${word}`,
				});
			}

			setRowIndex((i) => i + 1);
			setColIndex(0);
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

	useKeyPress((e) => {
		const { key } = e;
		handleKey(key);
	});

	const resetGame = () => {
		setGameStatus(DEFAULT_GAME.status);
		setBoard(DEFAULT_GAME.board);
		setRowIndex(DEFAULT_GAME.rowIndex);
		setColIndex(DEFAULT_GAME.colIndex);
		setWord(getRandomWord());
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
					<Button disabled>
						<HiChartBar />
					</Button>
					<Button
						disabled={gameStatus.active}
						onClick={(e) => {
							e.currentTarget.blur();
							resetGame();
						}}
					>
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
