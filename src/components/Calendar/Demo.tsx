import { useState } from 'react';
import { Calendar } from './Calendar';
import { EVENTS } from './data';

export const Demo = () => {
	const date = new Date();
	const [events, setEvents] = useState(EVENTS);

	return <Calendar date={date} events={events} setEvents={setEvents} />;
};
