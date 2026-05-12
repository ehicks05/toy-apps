import { Temporal } from 'temporal-polyfill';
import type { Event } from './components/Calendar/types';
import { useEvents } from './hooks/useEvents';

const COLORS = {
	green: '#14532d',
	blue: '#1e3a8a',
	violet: '#4c1d95',
	red: '#7f1d1d',
	rose: '#881337',
	amber: '#78350f',
	emerald: '#064e3b',
};

const tz = 'America/New_York';

export const useDemoEvents = () => {
	const { setEvents } = useEvents();

	const setDemoEvents = () => {
		const now = Temporal.Now.zonedDateTimeISO(tz).with({ minute: 0 });
		const day = now.round({ smallestUnit: 'day' });

		const events: Event[] = [
			{
				id: 'partialDay',
				label: 'partial day',
				description: 'foo',
				color: COLORS.emerald,
				start: day.with({ hour: 12 }),
				end: day.with({ hour: 13 }),
				isAllDay: false,
			},
			{
				id: 'partialDays',
				label: 'partial days',
				description: 'foo',
				color: COLORS.emerald,
				start: day.with({ day: now.day - 1, hour: 12 }),
				end: day.with({ day: now.day + 1, hour: 12 }),
				isAllDay: false,
			},
			{
				id: 'fullDay',
				label: 'full day',
				description: 'foo',
				color: COLORS.blue,
				start: day.with({ day: day.day + 2 }),
				end: day.with({ day: day.day + 2 }),
				isAllDay: true,
			},
			{
				id: 'fullDays',
				label: 'full days',
				description: 'foo',
				color: COLORS.violet,
				start: day.with({ day: day.day + 7 }),
				end: day.with({ day: day.day + 8 }),
				isAllDay: true,
			},
			{
				id: 'spanWeek',
				label: 'span a week',
				description: 'foo',
				color: COLORS.rose,
				start: day.with({ day: day.day - 7 }),
				end: day,
				isAllDay: true,
			},
			{
				id: 'longLabel',
				label: 'this is a really long name for an event',
				description: 'poop emoji',
				color: COLORS.green,
				start: day.with({ day: day.day + 1 }),
				end: day.with({ day: day.day + 1 }),
				isAllDay: true,
			},
		];

		setEvents(events);
	};

	return { setDemoEvents };
};
