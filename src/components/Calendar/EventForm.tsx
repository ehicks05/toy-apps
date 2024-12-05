import { useEvents } from '@/hooks/useJobs';
import { X } from 'lucide-react';
import { useState } from 'react';
import { Temporal } from 'temporal-polyfill';
import type { Event } from './types';

// push forward to the next quarter hour, then add 0 or more quarter hours
export const toNextQuarterHour = (
	date: Temporal.ZonedDateTime,
	additionalQuarterHours = 0,
) =>
	date
		.round({
			smallestUnit: 'minute',
			roundingIncrement: 15,
			roundingMode: 'ceil',
		})
		.add({ minutes: additionalQuarterHours * 15 });

const toDefaultEvent = (date: Temporal.ZonedDateTime): Event => ({
	id: String(Math.random()),
	label: '',
	description: '',
	isAllDay: true,
	color: '#3b82f6',
	tz: '',
	start: toNextQuarterHour(date),
	end: toNextQuarterHour(date, 1),
});

interface EventFormProps {
	date: Temporal.ZonedDateTime;
	event?: Event;
	close: () => void;
}

export const EventForm = ({ date, event: _event, close }: EventFormProps) => {
	const { events, setEvents } = useEvents();
	const [event, setEvent] = useState(_event || toDefaultEvent(date));

	const handleChange = (name: string, value: string | boolean) => {
		setEvent({ ...event, [name]: value });
	};

	const handleChangeStartTime = (name: string, value: string) => {
		const duration = event.start.until(event.end);

		// patch event.start with the incoming time string
		const start = event.start.withPlainTime(value);
		// update event.end in a way that maintains the duration
		const end = start.add(duration);

		setEvent({ ...event, start, end });
	};

	const handleChangeStartDate = (name: string, value: string) => {
		const duration = event.start.until(event.end);

		// patch event.start with the incoming date string
		const start = event.start.withPlainDate(value);
		// update event.end in a way that maintains the duration
		const end = start.add(duration);

		setEvent({ ...event, start, end });
	};

	const handleChangeEndTime = (name: string, value: string) => {
		const end = event.end.withPlainTime(value);
		setEvent({ ...event, end });
	};

	const handleChangeEndDate = (name: string, value: string) => {
		const end = event.end.withPlainDate(value);
		setEvent({ ...event, end });
	};

	const handleSubmit = () => {
		const unchangedEvents = _event
			? events.filter((e) => e.id !== _event.id)
			: events;
		setEvents([...unchangedEvents, event]);
		setEvent(toDefaultEvent(date));
		close();
	};

	return (
		<div className="flex flex-col gap-2 max-w-96 text-sm">
			<div className="flex justify-end gap-2">
				<button type="button" onClick={close} className="ml-2">
					<X size={16} />
				</button>
			</div>
			<div className="border border-neutral-700 -mx-2" />
			<label className="w-full flex items-center gap-1 text-neutral-300">
				<span className="min-w-20">Label</span>
				<input
					type="text"
					className="w-full p-1 rounded bg-neutral-700"
					value={event.label}
					onChange={(e) => handleChange('label', e.target.value)}
				/>
			</label>

			<label className="w-full flex items-center gap-1 text-neutral-300">
				<span className="min-w-20">Start</span>
				<input
					type="date"
					className="w-full p-1 rounded bg-neutral-700"
					value={event.start.toPlainDate().toString()}
					onChange={(e) => handleChangeStartDate('startDate', e.target.value)}
				/>
			</label>
			<datalist id="fifteenMinutes">
				{[...new Array(24 * 4)].map((_, i) => {
					const now = Temporal.Now.zonedDateTimeISO().startOfDay();
					const value = now
						.add({ minutes: 15 * i })
						.toPlainTime()
						.toString();
					return <option key={value} value={value} />;
				})}
			</datalist>
			{!event.isAllDay && (
				<label className="w-full flex items-center gap-1 text-neutral-300">
					<span className="min-w-20" />
					<input
						type="time"
						list="fifteenMinutes"
						className="w-full p-1 rounded bg-neutral-700"
						value={event.start.toPlainTime().toString()}
						step={15 * 60}
						onChange={(e) => handleChangeStartTime('startTime', e.target.value)}
					/>
				</label>
			)}
			<label className="w-full flex items-center gap-1 text-neutral-300">
				<span className="min-w-20">End</span>
				<input
					type="date"
					className="w-full p-1 rounded bg-neutral-700"
					value={event.end.toPlainDate().toString()}
					onChange={(e) => handleChangeEndDate('endDate', e.target.value)}
				/>
			</label>
			{!event.isAllDay && (
				<label className="w-full flex items-center gap-1 text-neutral-300">
					<span className="min-w-20" />
					<input
						type="time"
						list="fifteenMinutes"
						className="w-full p-1 rounded bg-neutral-700"
						value={event.end.toPlainTime().toString()}
						step={15 * 60}
						onChange={(e) => handleChangeEndTime('endTime', e.target.value)}
					/>
				</label>
			)}

			<label className="w-full flex items-center gap-1 text-neutral-300">
				<input
					type="checkbox"
					className="ml-24 p-1 rounded bg-neutral-700"
					checked={event.isAllDay}
					onChange={(e) => handleChange('isAllDay', e.target.checked)}
				/>
				All Day
			</label>

			<label className="w-full flex items-center gap-1 text-neutral-300">
				<span className="min-w-20">Description</span>
				<input
					type="text"
					className="w-full p-1 rounded bg-neutral-700"
					value={event.description}
					onChange={(e) => handleChange('description', e.target.value)}
				/>
			</label>
			<label className="w-full flex items-center gap-1 text-neutral-300">
				<span className="min-w-20">Color</span>
				<input
					type="color"
					className="w-full h-8 bg-transparent"
					value={event.color}
					onChange={(e) => handleChange('color', e.target.value)}
				/>
				<span className="text-xs">{event.color}</span>
			</label>
			<button
				type="button"
				onClick={handleSubmit}
				className="text-neutral-300 py-1 px-3 bg-blue-900 hover:bg-blue-800 rounded transition-all"
			>
				{_event ? 'Update' : 'Add'}
			</button>
		</div>
	);
};
