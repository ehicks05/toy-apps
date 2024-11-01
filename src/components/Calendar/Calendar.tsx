import { useState } from 'react';
import { MdArrowBack, MdArrowForward, MdToday } from 'react-icons/md';
import { Day } from './Day';
import { EventForm } from './EventForm';
import { EVENTS } from './data';
import { addMonths, getCalendarDays, getDayNames } from './dates';
import { type Event, isOverlapsDay } from './events';

interface MonthNavProps {
	date: Date;
	setDate: React.Dispatch<React.SetStateAction<Date>>;
	_date: Date;
}

const MonthNav = ({ date, setDate, _date }: MonthNavProps) => {
	const handleReset = () => setDate(_date);
	const handlePrev = () => setDate(addMonths(date, -1));
	const handleNext = () => setDate(addMonths(date, 1));

	return (
		<div className="flex gap-2 w-20 justify-end">
			<button type="button" onClick={handleReset}>
				<MdToday size={20} />
			</button>
			<button type="button" onClick={handlePrev}>
				<MdArrowBack size={20} />
			</button>
			<button type="button" onClick={handleNext}>
				<MdArrowForward size={20} />
			</button>
		</div>
	);
};

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
			{/* <pre className="whitespace-pre-wrap text-xs">
				{JSON.stringify({ date }, null, 2)}
			</pre> */}
		</div>
	);
};

const ActiveEvent = ({ event }: { event: Event }) => {
	const style = {
		backgroundColor: event.color.startsWith('#') ? event.color : undefined,
	};

	const df = Intl.DateTimeFormat('en-US', {
		month: 'numeric',
		day: 'numeric',
		year: 'numeric',
	});
	const dtf = Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' });

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-2 text-lg">
				<div className={`h-3 w-3 ${event.color} rounded-full`} style={style} />
				{event.label}
			</div>
			<div className="text-sm">{event.description}</div>
			<div className="text-sm">
				from {`${df.format(event.start)} at ${dtf.format(event.start)}`} to{' '}
				{`${df.format(event.end)} at ${dtf.format(event.end)}`}
			</div>
		</div>
	);
};

export const CalendarDemo = () => {
	const [isShowWeekend, setIsShowWeekend] = useState(true);
	const [events, setEvents] = useState(EVENTS);
	const [activeEventId, setActiveEventId] = useState<string | undefined>(undefined);
	const activeEvent = activeEventId && events.find((e) => e.id === activeEventId);

	const date = new Date('2024-10-31T00:00:00');

	return (
		<div className="flex flex-col gap-4">
			<label className="flex gap-2 text-neutral-300">
				<input
					type="checkbox"
					checked={isShowWeekend}
					onChange={() => setIsShowWeekend(!isShowWeekend)}
				/>
				Show Weekend?
			</label>
			<Calendar
				date={date}
				events={events}
				isShowWeekend={isShowWeekend}
				setActiveEventId={setActiveEventId}
			/>

			<div className="flex gap-8">
				<EventForm events={events} setEvents={setEvents} />
				{activeEvent && <ActiveEvent event={activeEvent} />}
			</div>

			{/* <pre className="whitespace-pre-wrap text-xs">
				{JSON.stringify({ events, activeEvent }, null, 2)}
			</pre> */}
		</div>
	);
};
