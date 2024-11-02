import { useSettings } from '@/hooks';
import { useState } from 'react';
import { Day } from './Day';
import { MonthNav } from './MonthNav';
import { getCalendarDays, getDayNames } from './dates';
import { isOverlapsDay } from './events';
import type { Event } from './types';

interface CalendarProps {
	date?: Date;
	events: Event[];
	setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
	isShowWeekend?: boolean;
}

export const Calendar = ({
	date: _date = new Date(),
	events: _events = [],
	setEvents,
}: CalendarProps) => {
	const { isShowWeekend } = useSettings();
	// TODO: sort by time as well
	const events = _events.toSorted(
		(a, b) => a.dates.start.getTime() - b.dates.start.getTime(),
	);
	const cols = isShowWeekend ? 7 : 5;

	const [date, setDate] = useState(_date);

	const days = getCalendarDays(date)
		.filter((date) => isShowWeekend || ![0, 6].includes(date.getDay()))
		.map((date) => ({
			date,
			events: events.filter((e) => isOverlapsDay(e.dates, date)),
		}));

	const dayNames = getDayNames().slice(cols === 7 ? 0 : 1, cols === 7 ? 7 : -1);
	const gridCols = cols === 7 ? 'grid-cols-7' : 'grid-cols-5';

	return (
		<div className="w-full border-2 border-neutral-800">
			<div className="p-2 border border-neutral-800 bg-neutral-800 font-semibold text-center">
				<div className="flex justify-between items-center">
					<div className="w-20" />
					{Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(
						date,
					)}
					<MonthNav date={date} setDate={setDate} _date={_date} />
				</div>
			</div>
			<div className={`w-full grid ${gridCols}`}>
				{dayNames.map((dow) => (
					<div key={dow} className="p-2 border border-neutral-800 bg-neutral-800">
						{dow}
					</div>
				))}
				{days.map(({ date, events }) => (
					<Day
						key={date.getTime()}
						date={date}
						events={events}
						setEvents={setEvents}
					/>
				))}
			</div>
		</div>
	);
};

interface ManagerProps {
	date?: Date;
	events: Event[];
}

export const Manager = ({
	date = new Date(),
	events: _events = [],
}: ManagerProps) => {
	const [events, setEvents] = useState(_events);

	return <Calendar date={date} events={events} setEvents={setEvents} />;
};
