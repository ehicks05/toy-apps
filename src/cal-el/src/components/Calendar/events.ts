import { Temporal } from 'temporal-polyfill';
import type { Interval } from './types';

export const isOverlapsDay = (
	{ start, end }: Interval,
	date: Temporal.ZonedDateTime,
) => {
	const startOfDay = date.startOfDay();
	const startOfNextDay = startOfDay.add({ days: 1 });

	return (
		Temporal.ZonedDateTime.compare(start, startOfNextDay) < 0 &&
		Temporal.ZonedDateTime.compare(end, startOfDay) >= 0
	);
};
