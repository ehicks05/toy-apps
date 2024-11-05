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
		id: 'running',
		label: 'gone running',
		description: 'at the mountain',
		color: COLORS.emerald,
		start: Temporal.ZonedDateTime.from('2024-10-11[America/New_York]'),
		end: Temporal.ZonedDateTime.from('2024-10-13[America/New_York]'),
		isAllDay: true,
	},
	{
		id: 'fish',
		label: 'gone fishing',
		description: 'at the lake',
		color: COLORS.emerald,
		start: Temporal.ZonedDateTime.from('2024-11-11[America/New_York]'),
		end: Temporal.ZonedDateTime.from('2024-11-13[America/New_York]'),
		isAllDay: true,
	},
	{
		id: 'med1',
		label: 'meditate',
		description: 'zen',
		color: COLORS.blue,
		start: Temporal.ZonedDateTime.from('2024-11-13[America/New_York]'),
		end: Temporal.ZonedDateTime.from('2024-11-13[America/New_York]'),
		isAllDay: true,
	},
	{
		id: 'study',
		label: 'study',
		description: 'learn',
		color: COLORS.violet,
		start: Temporal.ZonedDateTime.from('2024-11-13[America/New_York]'),
		end: Temporal.ZonedDateTime.from('2024-11-14[America/New_York]'),
		isAllDay: true,
	},
	{
		id: 'med2',
		label: 'meditate',
		description: 'ohm',
		color: COLORS.red,
		start: Temporal.ZonedDateTime.from('2024-11-30[America/New_York]'),
		end: Temporal.ZonedDateTime.from('2024-11-30[America/New_York]'),
		isAllDay: true,
	},
	{
		id: 'work',
		label: 'work out',
		description: 'i work out in order to achieve and retain the gains',
		color: COLORS.rose,
		start: Temporal.ZonedDateTime.from('2024-10-30[America/New_York]'),
		end: Temporal.ZonedDateTime.from('2024-11-04[America/New_York]'),
		isAllDay: true,
	},
	{
		id: 'asdf',
		label: 'this is a really long name for an event',
		description: 'poop emoji',
		color: COLORS.green,
		start: Temporal.ZonedDateTime.from('2024-11-30[America/New_York]'),
		end: Temporal.ZonedDateTime.from('2024-11-30[America/New_York]'),
		isAllDay: true,
	},
];
