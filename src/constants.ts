export type Result = 'unknown' | 'correct' | 'wrong_location' | 'not_present';

const DEFAULT_CELL = {
  letter: '',
  result: 'unknown' as Result,
};
const DEFAULT_ROW = [...new Array(5)].map(() => ({ ...DEFAULT_CELL }));
export const DEFAULT_BOARD = [...new Array(6)].map(() => [...DEFAULT_ROW]);
