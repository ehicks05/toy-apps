import type { Event } from './events';

const COLORS = {
	green: 'bg-green-900',
	blue: 'bg-blue-900',
	violet: 'bg-violet-900',
	red: 'bg-red-900',
	rose: 'bg-rose-900',
	amber: 'bg-amber-900',
	emerald: 'bg-emerald-900',
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
		description: 'i work out',
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
