import type { Interval } from './types';

export const isOverlapsDay = ({ start, end }: Interval, date: Date) => {
	const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	const endOfDay = new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate() + 1,
		0,
		0,
		0,
		-1,
	);

	return start <= endOfDay && end >= startOfDay;
};
