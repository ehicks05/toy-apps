import { useState } from 'react';
import type { Event } from './types';

export const toDateInputValue = (date: Date) => {
	const m = date.getMonth() + 1;
	const d = date.getDate();
	return `${date.getFullYear()}-${m < 10 ? `0${m}` : m}-${d < 10 ? `0${d}` : d}`;
};

export const toTimeInputValue = (date: Date) => {
	const h = date.getHours();
	const m = date.getMinutes();
	return `${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m}`;
};

export const toNextQuarterHour = (date: Date, additionalQuarterHours = 0) => {
	const minutesToMakeQuarterHour = 15 - (date.getMinutes() % 15);
	const additionalMinutes = 15 * additionalQuarterHours;
	const minutesToAdd = minutesToMakeQuarterHour + additionalMinutes;
	if (minutesToAdd === 0) {
		return date;
	}

	return new Date(new Date(date).setMinutes(date.getMinutes() + minutesToAdd));
};

const getDefaultEvent = (date: Date): Event => {
	return {
		id: String(Math.random()),
		label: '',
		description: '',
		dates: {
			start: date,
			end: date,
		},
		times: {
			start: toNextQuarterHour(new Date()),
			end: toNextQuarterHour(new Date(), 1),
		},
		isAllDay: true,
		color: '#3b82f6',
		tz: '',
	};
};

const toEventForm = (event: Event) => ({
	...event,
	dates: {
		start: toDateInputValue(event.dates.start),
		end: toDateInputValue(event.dates.end),
	},
	times: {
		start: toTimeInputValue(event.times.start),
		end: toTimeInputValue(event.times.end),
	},
});

const dateStringToDate = (input: string) => {
	const [y, m, d] = input.split('-').map(Number);
	return new Date(y, m - 1, d);
};

const getDefaultEventForm = (date: Date) => toEventForm(getDefaultEvent(date));

interface EventFormProps {
	date: Date;
	events: Event[];
	setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

export const EventForm = ({ date, events, setEvents }: EventFormProps) => {
	const [event, setEvent] = useState(getDefaultEventForm(date));
	console.log(event);
	const handleChange = (name: string, value: string | boolean) => {
		console.log({ name, value });
		setEvent({ ...event, [name]: value });
	};

	const handleSubmit = () => {
		const newEvent = {
			...event,
			dates: {
				start: dateStringToDate(event.dates.start),
				end: dateStringToDate(event.dates.end),
			},
			times: {
				start: new Date(event.times.start),
				end: new Date(event.times.end),
			},
		};
		console.log(newEvent);
		setEvents([...events, newEvent]);
		setEvent(getDefaultEventForm(date));
	};

	return (
		<div className="flex flex-col gap-2 items-start max-w-96 text-sm">
			<label className="w-full flex items-center gap-1 text-neutral-300">
				<span className="w-36">Label</span>
				<input
					type="text"
					className="w-full p-1 rounded bg-neutral-800"
					value={event.label}
					onChange={(e) => handleChange('label', e.target.value)}
				/>
			</label>

			<label className="w-full flex items-center gap-1 text-neutral-300">
				<span className="w-36">Start</span>
				<input
					type="date"
					className="w-full p-1 rounded bg-neutral-800"
					value={event.dates.start}
					onChange={(e) => handleChange('startDate', e.target.value)}
				/>
			</label>
			<datalist id="fifteenMinutes">
				{[...new Array(24 * 4)].map((_, i) => {
					const now = new Date();
					const value = toTimeInputValue(new Date(now.setHours(0, i * 15)));
					return <option key={value} value={value} />;
				})}
			</datalist>
			{!event.isAllDay && (
				<label className="w-full flex items-center gap-1 text-neutral-300">
					<span className="w-36" />
					<input
						type="time"
						list="fifteenMinutes"
						className="w-full p-1 rounded bg-neutral-800"
						value={event.times.start}
						onChange={(e) => handleChange('startTime', e.target.value)}
					/>
				</label>
			)}
			<label className="w-full flex items-center gap-1 text-neutral-300">
				<span className="w-36">End</span>
				<input
					type="date"
					className="w-full p-1 rounded bg-neutral-800"
					value={event.dates.end}
					onChange={(e) => handleChange('endDate', e.target.value)}
				/>
			</label>
			{!event.isAllDay && (
				<label className="w-full flex items-center gap-1 text-neutral-300">
					<span className="w-36" />
					<input
						type="time"
						list="fifteenMinutes"
						className="w-full p-1 rounded bg-neutral-800"
						value={event.times.end}
						onChange={(e) => handleChange('endTime', e.target.value)}
					/>
				</label>
			)}

			<label className="w-full flex items-center gap-1 text-neutral-300">
				<input
					type="checkbox"
					className="ml-24 p-1 rounded bg-neutral-800"
					checked={event.isAllDay}
					onChange={(e) => handleChange('isAllDay', e.target.checked)}
				/>
				All Day
			</label>

			<label className="w-full flex items-center gap-1 text-neutral-300">
				<span className="w-36">Description</span>
				<input
					type="text"
					className="w-full p-1 rounded bg-neutral-800"
					value={event.description}
					onChange={(e) => handleChange('description', e.target.value)}
				/>
			</label>
			<label className="w-full flex items-center gap-1 text-neutral-300">
				<span className="w-36">Color {event.color} </span>
				<input
					type="color"
					className="w-full h-8 bg-transparent"
					value={event.color}
					onChange={(e) => handleChange('color', e.target.value)}
				/>
			</label>
			<button
				type="button"
				onClick={handleSubmit}
				className="text-neutral-300 py-1 px-3 bg-blue-900 hover:bg-blue-800 rounded transition-all"
			>
				Add
			</button>
		</div>
	);
};
