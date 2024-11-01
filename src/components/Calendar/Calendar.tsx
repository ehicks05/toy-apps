import { useState } from 'react';
import { Day } from './Day';
import {  getCalendarDays, getDayNames } from './dates';
import { type Event, isOverlapsDay } from './events';
import { MonthNav } from './MonthNav';

interface CalendarProps {
	date?: Date;
	events: Event[];
	isShowWeekend?: boolean;
	setActiveEventId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const Calendar = ({
	date: _date = new Date(),
	events: _events = [],
	isShowWeekend = true,
	setActiveEventId,
}: CalendarProps) => {
	const events = _events.toSorted((a, b) => a.start.getTime() - b.start.getTime());
	const cols = isShowWeekend ? 7 : 5;

	const [date, setDate] = useState(_date);

	const days = getCalendarDays(date)
		.filter((date) => isShowWeekend || ![0, 6].includes(date.getDay()))
		.map((date) => ({
			date,
			events: events.filter((e) => isOverlapsDay(e, date)),
		}));

	const dayNames = getDayNames().slice(cols === 7 ? 0 : 1, cols === 7 ? 7 : -1);
	const gridCols = cols === 7 ? 'grid-cols-7' : 'grid-cols-5';

	return (
		<div className="w-full border border-neutral-800">
			<div className="p-2 border border-neutral-800 bg-neutral-800 font-semibold text-center">
				<div className="flex justify-between items-center">
					<div className="w-20" />
					{Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(
						date,
					)}
					<MonthNav date={date} setDate={setDate} _date={_date} />
				</div>
			</div>
			<div className={`grid ${gridCols}`}>
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
						setActiveEventId={setActiveEventId}
					/>
				))}
			</div>
		</div>
	);
};
