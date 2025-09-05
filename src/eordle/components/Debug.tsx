import { HiCode } from 'react-icons/hi';
import { useLocalStorage } from 'usehooks-ts';
import type { Board, GameStatus } from '../types';
import Button from './Button';

interface GameState {
	word: string;
	rowIndex: number;
	colIndex: number;
	boardEffects: string[];
	gameStatus: GameStatus;
	board: Board;
}

const Debug = ({ state }: { state: GameState }) => {
	const [debug] = useLocalStorage('debug', false);

	return debug ? (
		<div className="flex p-4 bg-neutral-800 text-xs">
			<pre className="text-xs">{JSON.stringify(state, null, 2)}</pre>
		</div>
	) : null;
};

const DebugButton = () => {
	const [debug, setDebug] = useLocalStorage('debug', false);

	return import.meta.env.DEV ? (
		<Button
			className={debug ? 'bg-neutral-500' : 'bg-neutral-700'}
			onClick={() => setDebug((debug) => !debug)}
		>
			<HiCode />
		</Button>
	) : null;
};

export { Debug, DebugButton };
