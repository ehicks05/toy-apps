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
		dates: {
			start: new Date(2024, 9, 11),
			end: new Date(2024, 9, 13),
		},
		times: {
			start: new Date(2024, 9, 11),
			end: new Date(2024, 9, 13),
		},
		tz: '',
		isAllDay: true,
	},
	{
		id: 'fish',
		label: 'gone fishing',
		description: 'at the lake',
		color: COLORS.emerald,
		dates: {
			start: new Date(2024, 10, 11),
			end: new Date(2024, 10, 13),
		},
		times: {
			start: new Date(2024, 10, 11),
			end: new Date(2024, 10, 13),
		},
		tz: '',
		isAllDay: true,
	},
	{
		id: 'med1',
		label: 'meditate',
		description: 'zen',
		color: COLORS.blue,
		dates: {
			start: new Date(2024, 10, 13, 12),
			end: new Date(2024, 10, 13),
		},
		times: {
			start: new Date(2024, 10, 13, 12),
			end: new Date(2024, 10, 13),
		},
		tz: '',
		isAllDay: true,
	},
	{
		id: 'study',
		label: 'study',
		description: 'learn',
		color: COLORS.violet,

		dates: {
			start: new Date(2024, 10, 13),
			end: new Date(2024, 10, 14),
		},
		times: {
			start: new Date(2024, 10, 13),
			end: new Date(2024, 10, 14),
		},
		tz: '',
		isAllDay: true,
	},
	{
		id: 'med2',
		label: 'meditate',
		description: 'ohm',
		color: COLORS.red,

		dates: {
			start: new Date(2024, 10, 30),
			end: new Date(2024, 10, 30),
		},
		times: {
			start: new Date(2024, 10, 30),
			end: new Date(2024, 10, 30),
		},
		tz: '',
		isAllDay: true,
	},
	{
		id: 'work',
		label: 'work out',
		description: 'i work out in order to achieve and retain the gains',
		color: COLORS.rose,

		dates: {
			start: new Date(2024, 9, 30),
			end: new Date(2024, 10, 4),
		},
		times: {
			start: new Date(2024, 9, 30),
			end: new Date(2024, 10, 4),
		},
		tz: '',
		isAllDay: true,
	},
	{
		id: 'asdf',
		label: 'this is a really long name for an event',
		description: 'poop emoji',
		color: COLORS.green,

		dates: {
			start: new Date(2024, 10, 31),
			end: new Date(2024, 10, 31),
		},
		times: {
			start: new Date(2024, 10, 31),
			end: new Date(2024, 10, 31),
		},
		tz: '',
		isAllDay: true,
	},
];
