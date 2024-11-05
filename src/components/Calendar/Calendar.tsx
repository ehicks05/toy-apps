import { useSettings } from '@/hooks';
import { chunk } from 'lodash-es';
import { useState } from 'react';
import type { Temporal } from 'temporal-polyfill';
import { Day } from './Day';
import { MonthMenu } from './MonthMenu';
import { getCalendarDays, getDayNames } from './dates';
import { isOverlapsDay } from './events';
import type { Event } from './types';

interface Props {
	date: Temporal.ZonedDateTime;
	events: Event[];
	setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

export const Calendar = ({ date: _date, events, setEvents }: Props) => {
	const { isShowWeekend } = useSettings();
	const cols = isShowWeekend ? 7 : 5;

	const [date, setDate] = useState(_date);

	const days = getCalendarDays(date)
		.filter((date) => isShowWeekend || ![0, 6].includes(date.dayOfWeek))
		.map((date) => ({
			date,
			events: events.filter((e) => isOverlapsDay(e, date)),
		}));

	const dayNames = getDayNames().slice(cols === 7 ? 0 : 1, cols === 7 ? 7 : -1);
	const gridCols = cols === 7 ? 'grid-cols-7' : 'grid-cols-5';
	const monthLabel = date.toLocaleString('en-US', {
		month: 'long',
		year: 'numeric',
	});

	const weeks = chunk(days, 7);

	return (
		<div className="w-full border-2 border-neutral-800">
			<div className="p-2 border border-neutral-800 bg-neutral-800 font-semibold text-center">
				<div className="flex justify-between items-center">
					<div className="w-32" /> {/* hack to keep label centered */}
					{monthLabel}
					<MonthMenu date={date} setDate={setDate} _date={_date} />
				</div>
			</div>
			<div className={`w-full grid ${gridCols}`}>
				{dayNames.map((dow) => (
					<div key={dow} className="p-2 border border-neutral-800 bg-neutral-800">
						{dow}
					</div>
				))}
				{weeks.map((week) => {
					// find each event's 'swimlane'
					const eventLanes: Record<string, number> = {};

					week.forEach((day) =>
						day.events.forEach((event, i) => {
							if (eventLanes[event.id]) {
								return;
							}
							eventLanes[event.id] = i;
						}),
					);

					return week.map(({ date, events }) => (
						<Day
							key={date.toString()}
							date={date}
							events={events}
							setEvents={setEvents}
							eventLanes={eventLanes}
						/>
					));
				})}
			</div>
		</div>
	);
};
