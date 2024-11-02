import type { Event } from './events';

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
		id: 'fish',
		label: 'gone fishing',
		description: 'at the lake',
		color: COLORS.emerald,
		start: new Date(2024, 10, 11),
		end: new Date(2024, 10, 13),
	},
	{
		id: 'med1',
		label: 'meditate',
		description: 'zen',
		color: COLORS.blue,
		start: new Date(2024, 10, 13, 12),
		end: new Date(2024, 10, 13),
	},
	{
		id: 'study',
		label: 'study',
		description: 'learn',
		color: COLORS.violet,
		start: new Date(2024, 10, 13),
		end: new Date(2024, 10, 14),
	},
	{
		id: 'med2',
		label: 'meditate',
		description: 'ohm',
		color: COLORS.red,
		start: new Date(2024, 10, 30),
		end: new Date(2024, 10, 30),
	},
	{
		id: 'work',
		label: 'work out',
		description: 'i work out in order to achieve and retain the gains',
		color: COLORS.rose,
		start: new Date(2024, 9, 30),
		end: new Date(2024, 10, 4),
	},
	{
		id: 'asdf',
		label: 'this is a really long name for an event',
		description: 'poop emoji',
		color: COLORS.green,
		start: new Date(2024, 10, 31),
		end: new Date(2024, 10, 31),
	},
];
