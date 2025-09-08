import type { Temporal } from 'temporal-polyfill';

export interface Interval {
	start: Temporal.ZonedDateTime;
	end: Temporal.ZonedDateTime;
}

export interface Calendar {
	id: string;
	label: string;
	color: string;
}

export interface Event {
	id: string;
	calendarId?: string;

	label: string;
	description: string;
	color: string;

	start: Temporal.ZonedDateTime;
	end: Temporal.ZonedDateTime;
	isAllDay: boolean;
	tz?: string;
}
