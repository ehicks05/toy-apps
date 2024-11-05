import { useState } from 'react';
import { Temporal } from 'temporal-polyfill';
import { Calendar } from './Calendar';
import { EVENTS } from './data';

export const Demo = () => {
	const date = Temporal.Now.zonedDateTimeISO();
	const [events, setEvents] = useState(EVENTS);

	const sortedEvents = events.toSorted((a, b) =>
		Temporal.ZonedDateTime.compare(a.start, b.start),
	);
	return <Calendar date={date} events={sortedEvents} setEvents={setEvents} />;
};
