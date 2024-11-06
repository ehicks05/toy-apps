import { EVENTS } from '@/components/Calendar/data';
import { useLocalStorage } from '@uidotdev/usehooks';
import { Temporal } from 'temporal-polyfill';
import type { Event } from '../components/Calendar/types';

const isPartialDay = (event: Event) =>
	!event.isAllDay && event.start.toPlainDate().equals(event.end.toPlainDate());

const partialDaySort = (a: Event, b: Event) => {
	const a1 = isPartialDay(a) ? -1 : 1;
	const b1 = isPartialDay(b) ? -1 : 1;
	return b1 - a1;
};

const sort = (a: Event, b: Event) => {
	const partialDayResult = partialDaySort(a, b);
	if (partialDayResult !== 0) return partialDayResult;

	const startResult = Temporal.ZonedDateTime.compare(a.start, b.start);
	return startResult;
};

const hydrateEvent = (e: Event) => ({
	...e,
	start: Temporal.ZonedDateTime.from(e.start),
	end: Temporal.ZonedDateTime.from(e.end),
});

export const useEvents = () => {
	const [_events, setEvents] = useLocalStorage('ecal-events', EVENTS);

	const events = _events.map(hydrateEvent).toSorted(sort);

	return {
		events,
		setEvents,
	};
};
