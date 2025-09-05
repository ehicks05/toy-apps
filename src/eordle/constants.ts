import type { Board, Cell, Game, GameStatus, Row } from './types';

export const DEFAULT_STATUS: GameStatus = { active: true, gameOverMessage: '' };

const DEFAULT_CELL: Cell = {
	letter: '',
	result: 'unknown',
	effects: [],
};
const DEFAULT_ROW: Row = {
	cells: [...new Array(5)].map(() => ({ ...DEFAULT_CELL })),
	effects: [],
};
export const DEFAULT_BOARD: Board = {
	rows: [...new Array(6)].map(() => ({ ...DEFAULT_ROW })),
};

export const DEFAULT_GAME: Game = {
	status: DEFAULT_STATUS,
	board: DEFAULT_BOARD,
	rowIndex: 0,
	colIndex: 0,
};
