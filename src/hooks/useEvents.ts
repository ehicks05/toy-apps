import { EVENTS } from '@/components/Calendar/data';
import { useLocalStorage } from '@uidotdev/usehooks';
import { Temporal } from 'temporal-polyfill';
import type { Event } from '../components/Calendar/types';

const sort = (a: Event, b: Event) =>
	Temporal.ZonedDateTime.compare(a.start, b.start);

const hydrateEvent = (e: Event) => ({
	...e,
	start: Temporal.ZonedDateTime.from(e.start),
	end: Temporal.ZonedDateTime.from(e.end),
});

export const useEvents = () => {
	const [_events, setEvents] = useLocalStorage('ecal-events', EVENTS.toSorted(sort));

	const events = _events.map(hydrateEvent);

	return {
		events,
		setEvents,
	};
};
