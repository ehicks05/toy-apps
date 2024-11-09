import type { Temporal } from 'temporal-polyfill';

/**
 * @returns An array including every day of `date's` month, flanked if needed,
 * by a few days of the previous and next month as needed to fill out a monthly
 * calendar so it starts on Sun and ends on a Sat.
 */
export const getMonthlyCalendarDays = (date: Temporal.ZonedDateTime) => {
	const start = date.with({ day: 1 });

	const currentMonthDays = [...new Array(date.daysInMonth)].map((_, i) =>
		start.add({ days: i }),
	);

	const prevMonthDays = [...new Array(start.dayOfWeek)].map((_, i) =>
		start.subtract({ days: start.dayOfWeek - i }),
	);

	const daysInLastRow = (prevMonthDays.length + currentMonthDays.length) % 7;
	const additionalDaysNeeded = daysInLastRow ? 7 - daysInLastRow : 0;
	const nextMonthDays = [...new Array(additionalDaysNeeded)].map((_, i) =>
		start.with({ month: start.month + 1, day: 1 + i }),
	);

	return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
};
