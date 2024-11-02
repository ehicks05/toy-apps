export interface Interval {
	start: Date;
	end: Date;
}

export interface Event {
	id: string;
	calendarId?: string;

	label: string;
	description: string;
	color: string;

	dates: Interval;
	times: Interval;
	isAllDay: boolean;
	tz: string;
}
