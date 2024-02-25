import React from 'react';
import { useLocalStorageValue } from '@react-hookz/web';
import { HiCode } from 'react-icons/hi';
import Button from './Button';
import { IBoard } from '../constants';
import { GameStatus } from '../App';

interface GameState {
	word: string;
	rowIndex: number;
	colIndex: number;
	boardEffects: string[];
	gameStatus: GameStatus;
	board: IBoard;
}

const Debug = ({ state }: { state: GameState }) => {
	const [debug] = useLocalStorageValue('debug', false);

	return debug ? (
		<div className="flex p-4 bg-neutral-800 text-xs">
			<pre className="text-xs">{JSON.stringify(state, null, 2)}</pre>
		</div>
	) : null;
};

const DebugButton = () => {
	const [debug, setDebug] = useLocalStorageValue('debug', false);

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
