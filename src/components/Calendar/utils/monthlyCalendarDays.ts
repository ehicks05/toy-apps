import type { Temporal } from 'temporal-polyfill';

export const getMonthlyCalendarDays = (date: Temporal.ZonedDateTime) => {
	const start = date.with({ day: 1 });

	const currentMonthDays = [...new Array(date.daysInMonth)].map((_, i) =>
		start.add({ days: i }),
	);

	const prevMonthDays = [...new Array(start.dayOfWeek)]
		.map((_, i) => start.subtract({ days: i + 1 }))
		.toReversed();

	const daysInLastRow = (prevMonthDays.length + currentMonthDays.length) % 7;
	const additionalDaysNeeded = daysInLastRow ? 7 - daysInLastRow : 0;
	const nextMonthDays = [...new Array(additionalDaysNeeded)].map((_, i) =>
		start.with({ month: start.month + 1, day: i + 1 }),
	);

	return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
};
