import { Temporal } from 'temporal-polyfill';

export const getWeekdayNames = () => {
	const temp = Temporal.Now.zonedDateTimeISO();
	return [...new Array(7)].map((_, i) =>
		temp
			.with({ day: temp.day - temp.dayOfWeek + i })
			.toLocaleString('en-US', { weekday: 'short' }),
	);
};
