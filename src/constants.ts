export type GuessResult = 'unknown' | 'correct' | 'wrong_location' | 'not_present';
export type IBoard = typeof DEFAULT_BOARD;
export interface Cell {
	letter: string;
	result: GuessResult;
}

const DEFAULT_CELL: Cell = {
	letter: '',
	result: 'unknown',
};
const DEFAULT_ROW = [...new Array(5)].map(() => ({ ...DEFAULT_CELL }));
export const DEFAULT_BOARD = [...new Array(6)].map(() => [...DEFAULT_ROW]);
