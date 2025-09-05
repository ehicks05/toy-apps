import { HiOutlineBackspace } from 'react-icons/hi';
import type { Board, GuessResult } from '../types';

const GUESS_RESULT_STYLES: Record<GuessResult, string> = {
	not_present: 'bg-neutral-700',
	correct: 'bg-green-600 duration-1000',
	wrong_location: 'bg-yellow-500 duration-1000',
	unknown: 'bg-neutral-500 duration-700',
};

// The game board may contain two of the same letter, one `correct`
// and one `wrong_location`. we must pick one for the keyboard.
// this is the priority order:
const GUESS_RESULT_PRIORITIES: Record<GuessResult, number> = {
	correct: 0,
	wrong_location: 1,
	not_present: 2,
	unknown: 3,
};

const getLetterResults = (board: Board) =>
	board.rows
		.flatMap((row) => row.cells)
		.sort(
			({ result: r1 }, { result: r2 }) =>
				GUESS_RESULT_PRIORITIES[r2] - GUESS_RESULT_PRIORITIES[r1],
		)
		.reduce(
			(agg, curr) => ({ ...agg, [curr.letter]: curr.result }),
			{} as Record<string, GuessResult>,
		);

interface KbKeyProps {
	kbKey: string;
	letterResult: GuessResult;
	handleKey: (key: string) => void;
}
const KbKey = ({ kbKey, letterResult, handleKey }: KbKeyProps) => {
	const renderKey =
		kbKey === 'Backspace' ? <HiOutlineBackspace size={24} /> : kbKey.toUpperCase();
	const base =
		'flex items-center justify-center p-2 sm:p-3 md:p-4 h-full rounded text-sm font-bold';
	const resultStyle = GUESS_RESULT_STYLES[letterResult || 'unknown'];
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

const KEYS = [
	['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
	['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
	['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
];

interface KeyboardProps {
	board: Board;
	handleKey: (key: string) => void;
}
const Keyboard = ({ board, handleKey }: KeyboardProps) => {
	const letterResults = getLetterResults(board);
	return (
		<div className="flex flex-col gap-1.5 w-screen max-w-full h-52">
			{KEYS.map((row, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: ok
				<div key={i} className="flex justify-center gap-1.5 h-full">
					{row.map((key) => (
						<KbKey
							key={key}
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
