export type GuessResult = 'unknown' | 'correct' | 'wrong_location' | 'not_present';

export interface Cell {
	effects: string[];
	letter: string;
	result: GuessResult;
}

export interface Row {
	effects: string[];
	cells: Cell[];
}

export interface Board {
	rows: Row[];
}

export interface GameStatus {
	active: boolean;
	gameOverMessage: string;
}

export interface Game {
	board: Board;
	rowIndex: number;
	colIndex: number;
	status: GameStatus;
}
