import { useSettings } from '@/hooks';
import { useEvents } from '@/hooks/useJobs';
import { chunk } from 'lodash-es';
import { useState } from 'react';
import type { Temporal } from 'temporal-polyfill';
import { MyDndContext } from '../../dnd/DndContext';
import { Day } from './Day';
import { MonthMenu } from './MonthMenu';
import { WeekdayNames } from './WeekdayNames';
import { isOverlapsDay } from './events';
import type { Event } from './types';
import { calendarDaysForMonth } from './utils/calendarDaysForMonth';

/*
 SPECS:
 1. partial 1-day events (colored dot ui) always below other events
 2. when stacking, events starting earlier should be sorted earlier
 2a. if start dates match, later end dates should be sorted earlier
 */

const findFirstAvailableSlot = (takenSlots: number[]) => {
	let i = 0;
	while (true) {
		if (!takenSlots.includes(i)) return i;
		i++;
	}
};

interface EventInWeek extends Event {
	startIndex: number;
	endIndex: number;
}

interface CalendarWeekProps {
	days: Temporal.ZonedDateTime[];
	eventsInWeek: EventInWeek[];
}

const CalendarWeek = ({ days, eventsInWeek }: CalendarWeekProps) => {
	// track lanes in use on each day
	const slotsInUse: Record<number, number[]> = {};
	days.forEach((_, i) => {
		slotsInUse[i] = [];
	});

	const eventsStartingEachDay = days.reduce(
		(agg, _, i) => {
			const eventsStartingThisDay = eventsInWeek.filter(
				(event) => event.startIndex === i,
			);
			return { ...agg, [i]: eventsStartingThisDay };
		},
		{} as Record<number, EventInWeek[]>,
	);
	// console.log(eventsStartingEachDay);

	const eventIdToProperLane: Record<string, number> = {};

	const annotatedEvents = eventsInWeek.map((event) => {
		const eventsStartingThisDay = eventsStartingEachDay[event.startIndex];
		const prevEventIdOnSameStartDay = eventsStartingThisDay
			.slice(
				0,
				eventsStartingThisDay.findIndex((e) => e.id === event.id),
			)
			.at(-1)?.id;

		const naturalLane = prevEventIdOnSameStartDay
			? eventIdToProperLane[prevEventIdOnSameStartDay] + 1
			: 0; // what static positioning will do

		const properLane = findFirstAvailableSlot(slotsInUse[event.startIndex]);
		eventIdToProperLane[event.id] = properLane;

		for (let i = event.startIndex; i <= event.endIndex; i++) {
			slotsInUse[i].push(properLane);
		}

		console.log({
			event: event.label,
			naturalLane,
			properLane,
			laneOffset: properLane - naturalLane,
		});

		return {
			...event,
			laneOffset: properLane - naturalLane,
			dayCount: event.endIndex - event.startIndex + 1,
		};
	});

	return days.map((date, i) => {
		const eventsInDay = annotatedEvents.filter((event) => event.startIndex === i);

		return <Day key={date.toString()} date={date} eventsInDay={eventsInDay} />;
	});
};

const getMonthLabel = (date: Temporal.ZonedDateTime) =>
	date.toLocaleString('en-US', {
		month: 'long',
		year: 'numeric',
	});

interface Props {
	date: Temporal.ZonedDateTime;
}

export const Calendar = ({ date: _date }: Props) => {
	const [date, setDate] = useState(_date);
	const { isShowWeekend } = useSettings();
	const { events } = useEvents();
	const cols = isShowWeekend ? 7 : 5;
	const gridCols = cols === 7 ? 'grid-cols-7' : 'grid-cols-5';

	const days = calendarDaysForMonth(date).filter(
		(date) => isShowWeekend || ![0, 6].includes(date.dayOfWeek),
	);

	const weeks = chunk(days, cols)
		// .slice(0, 1)
		.map((week, i) => {
			const eventsInWeek = events
				.map((event) => {
					const startIndex = week.findIndex((day) => isOverlapsDay(event, day));
					let endIndex =
						startIndex !== -1
							? week.findIndex(
									(day, i) => i >= startIndex && !isOverlapsDay(event, day),
								) - 1
							: -1;
					if (startIndex !== -1 && endIndex <= -1) {
						endIndex = week.length - 1;
					}

					return { ...event, startIndex, endIndex };
				})
				.filter((event) => event.startIndex !== -1);
			return { index: i, days: week, eventsInWeek };
		});

	return (
		<MyDndContext>
			<div className="w-full border-2 border-neutral-800">
				<div className="p-2 border border-neutral-800 bg-neutral-800 font-semibold text-center">
					<div className="flex justify-between items-center">
						<div className="w-32" /> {/* hack to keep label centered */}
						{getMonthLabel(date)}
						<MonthMenu date={date} setDate={setDate} _date={_date} />
					</div>
				</div>
				<div className={`w-full grid ${gridCols}`}>
					<WeekdayNames />

					{weeks.map(({ index, days, eventsInWeek }) => (
						<CalendarWeek key={index} days={days} eventsInWeek={eventsInWeek} />
					))}
				</div>
			</div>
		</MyDndContext>
	);
};
