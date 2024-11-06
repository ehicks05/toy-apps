import { Temporal } from 'temporal-polyfill';
import type { Event } from './types';

const COLORS = {
	green: '#14532d',
	blue: '#1e3a8a',
	violet: '#4c1d95',
	red: '#7f1d1d',
	rose: '#881337',
	amber: '#78350f',
	emerald: '#064e3b',
};

export const EVENTS: Event[] = [
	{
		id: 'partialDay',
		label: 'partial day',
		description: 'foo',
		color: COLORS.emerald,
		start: Temporal.ZonedDateTime.from('2024-11-11T12:00:00[America/New_York]'),
		end: Temporal.ZonedDateTime.from('2024-11-11T13:00:00[America/New_York]'),
		isAllDay: false,
	},
	{
		id: 'partialDays',
		label: 'partial days',
		description: 'foo',
		color: COLORS.emerald,
		start: Temporal.ZonedDateTime.from('2024-11-11T12:00:00[America/New_York]'),
		end: Temporal.ZonedDateTime.from('2024-11-13T12:00:00[America/New_York]'),
		isAllDay: false,
	},
	{
		id: 'fullDay',
		label: 'full day',
		description: 'foo',
		color: COLORS.blue,
		start: Temporal.ZonedDateTime.from('2024-11-13[America/New_York]'),
		end: Temporal.ZonedDateTime.from('2024-11-13[America/New_York]'),
		isAllDay: true,
	},
	{
		id: 'fullDays',
		label: 'full days',
		description: 'foo',
		color: COLORS.violet,
		start: Temporal.ZonedDateTime.from('2024-11-13[America/New_York]'),
		end: Temporal.ZonedDateTime.from('2024-11-14[America/New_York]'),
		isAllDay: true,
	},
	{
		id: 'spanWeek',
		label: 'span a week',
		description: 'foo',
		color: COLORS.rose,
		start: Temporal.ZonedDateTime.from('2024-11-01[America/New_York]'),
		end: Temporal.ZonedDateTime.from('2024-11-07[America/New_York]'),
		isAllDay: true,
	},
	{
		id: 'longLabel',
		label: 'this is a really long name for an event',
		description: 'poop emoji',
		color: COLORS.green,
		start: Temporal.ZonedDateTime.from('2024-11-18[America/New_York]'),
		end: Temporal.ZonedDateTime.from('2024-11-18[America/New_York]'),
		isAllDay: true,
	},
];
