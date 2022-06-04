1. coalesce state

```
interface Cell {
  effects: string[];
  letter: string;
  result: Result;
}

interface Row {
  effects: string[];
  cells: Cell[];
}

interface Board {
  rows: Row;
}

interface GameStatus {
  isGameOver: boolean;
  message: string;
}

interface Game {
  board: Board;
  rowIndex: number;
  colIndex: number;
  status: Status;
}
```