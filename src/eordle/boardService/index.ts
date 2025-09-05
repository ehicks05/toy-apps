import { Board, Cell, Row } from '../types';

export const getCell = (board: Board, rowIndex: number, cellIndex: number) =>
	board.rows[rowIndex].cells[cellIndex];

export const updateCell = (
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

// note that finding `correct` is higher priority
// and that for `correct` and `wrong_location` matches we
// eliminate that letter from `w` so it can't be matched again
export const checkRow = (row: Row, word: string) => {
	const w = word.split('');
	const checkedCells: Cell[] = row.cells
		.map((cell, i): Cell => {
			if (w[i] === cell.letter) {
				w[i] = '';
				return { ...cell, result: 'correct' };
			}

			return cell;
		})
		.map((cell): Cell => {
			if (cell.result === 'correct') return cell;

			const matchIndex = w.indexOf(cell.letter);
			if (matchIndex === -1) {
				return { ...cell, result: 'not_present' };
			}

			// eliminate from future matches
			w[matchIndex] = '';
			return { ...cell, result: 'wrong_location' };
		});

	return { ...row, cells: checkedCells };
};
