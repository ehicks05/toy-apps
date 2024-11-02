import { useState } from 'react';
import { Calendar } from './Calendar';
import { EVENTS } from './data';

export const Demo = () => {
	const date = new Date();
	const [events, setEvents] = useState(EVENTS);

	// TODO: sort by time as well
	const sortedEvents = events.toSorted(
		(a, b) => a.dates.start.getTime() - b.dates.start.getTime(),
	);
	return <Calendar date={date} events={sortedEvents} setEvents={setEvents} />;
};
