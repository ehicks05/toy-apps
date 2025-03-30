import { APP_NAME } from '@/constants/app';
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
	// const partialDayResult = partialDaySort(a, b);
	// if (partialDayResult !== 0) return partialDayResult;

	const startResult = Temporal.ZonedDateTime.compare(a.start, b.start);
	if (startResult !== 0) return startResult;

	const endResult = Temporal.ZonedDateTime.compare(a.end, b.end);
	if (endResult !== 0) return startResult;

	const labelResult = a.label.localeCompare(b.label);
	if (labelResult !== 0) return labelResult;

	return a.id.localeCompare(b.id);
};

const hydrateEvent = (e: Event) => ({
	...e,
	start: Temporal.ZonedDateTime.from(e.start),
	end: Temporal.ZonedDateTime.from(e.end),
});

export const useEvents = () => {
	const [_events, setEvents] = useLocalStorage(`${APP_NAME}-events`, [] as Event[]);

	const removeEvent = (id: string) => setEvents(events.filter((e) => e.id !== id));
	const byId = (id: string) => events.find((e) => e.id === id);

	const events = _events.map(hydrateEvent).toSorted(sort);

	// console.log(
	// 	events.map((e) => ({
	// 		start: e.start.toString(),
	// 		end: e.end.toString(),
	// 		label: e.label,
	// 	})),
	// );

	return {
		events,
		setEvents,
		removeEvent,
		byId,
	};
};
