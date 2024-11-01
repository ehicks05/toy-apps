export const getDayNames = () => {
	const fmt = new Intl.DateTimeFormat('en-US', { weekday: 'short' });
	const temp = new Date();
	return [...new Array(7)].map((_, i) => {
		temp.setDate(temp.getDate() - temp.getDay() + i);
		return fmt.format(temp);
	});
};

export const getStartOfMonth = (date: Date) =>
	new Date(date.getFullYear(), date.getMonth(), 1);
export const getEndOfMonth = (date: Date) =>
	new Date(date.getFullYear(), date.getMonth() + 1, 0);

export const addMonths = (_date: Date, n: number) => {
	const originalDayOfMonth = _date.getDate();
	const firstDayOfRequestdMonth = new Date(
		new Date(_date).setMonth(_date.getMonth() + n, 1),
	);
	const lastDayOfRequestdMonth = new Date(
		new Date(firstDayOfRequestdMonth).setMonth(
			firstDayOfRequestdMonth.getMonth() + 1,
			0,
		),
	).getDate();

	// if the requested month has fewer days than the incoming dayOfMonth,
	// reduce the new dayOfMonth to fit inside the requested month
	const newDayOfMonth = Math.min(originalDayOfMonth, lastDayOfRequestdMonth);
	return new Date(firstDayOfRequestdMonth.setDate(newDayOfMonth));
};

export const getCalendarDays = (date: Date) => {
	const start = getStartOfMonth(date);
	const end = getEndOfMonth(date);

	const currentMonthDays = [...new Array(end.getDate())].map(
		(_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i),
	);

	const prevMonthDays = [...new Array(start.getDay())]
		.map(
			(_, i) =>
				new Date(start.getFullYear(), start.getMonth(), start.getDate() - i - 1),
		)
		.toReversed();

	const daysInLastRow = (prevMonthDays.length + currentMonthDays.length) % 7;
	const additionalDaysNeeded = daysInLastRow ? 7 - daysInLastRow : 0;
	const nextMonthDays = [...new Array(additionalDaysNeeded)].map((_, i) => {
		return new Date(start.getFullYear(), start.getMonth() + 1, start.getDate() + i);
	});

	return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
};
