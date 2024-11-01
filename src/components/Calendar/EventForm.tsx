import { useState } from 'react';
import type { Event } from './events';

const getDefaultEvent = () => {
	const now = new Date();
	return {
		id: String(Math.random()),
		label: 'asdf',
		description: 'asdf asdf',
		start: new Date(now.setSeconds(0, 0)).toISOString().slice(0, -1),
		end: new Date(now.setSeconds(0, 0)).toISOString().slice(0, -1),
		color: '#0a7b17',
	};
};

interface EventFormProps {
	events: Event[];
	setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

export const EventForm = ({ events, setEvents }: EventFormProps) => {
	const [event, setEvent] = useState(getDefaultEvent());

	const handleChange = (name: string, value: string | Date | null) =>
		setEvent({ ...event, [name]: value });

	const handleSubmit = () => {
		setEvents([
			...events,
			{ ...event, start: new Date(event.start), end: new Date(event.end) },
		]);
		setEvent(getDefaultEvent());
	};

	return (
		<div className="flex flex-col gap-4 items-start max-w-96">
			<h3 className="text-lg">Add an Event</h3>
			<label className="w-full flex items-center gap-1 text-neutral-300">
				<span className="w-36">Label</span>
				<input
					type="text"
					className="w-full p-2 rounded bg-neutral-800"
					value={event.label}
					onChange={(e) => handleChange('label', e.target.value)}
				/>
			</label>
			<label className="w-full flex items-center gap-1 text-neutral-300">
				<span className="w-36">Description</span>
				<input
					type="text"
					className="w-full p-2 rounded bg-neutral-800"
					value={event.description}
					onChange={(e) => handleChange('description', e.target.value)}
				/>
			</label>
			<label className="w-full flex items-center gap-1 text-neutral-300">
				<span className="w-36">Start</span>
				<input
					type="datetime-local"
					className="w-full p-2 rounded bg-neutral-800"
					value={event.start}
					onChange={(e) => handleChange('start', e.target.value)}
				/>
			</label>
			<label className="w-full flex items-center gap-1 text-neutral-300">
				<span className="w-36">End</span>
				<input
					type="datetime-local"
					className="w-full p-2 rounded bg-neutral-800"
					value={event.end}
					onChange={(e) => handleChange('end', e.target.value)}
				/>
			</label>
			<label className="w-full flex items-center gap-1 text-neutral-300">
				<span className="w-36">Color {event.color} </span>
				<input
					type="color"
					className="w-full h-12 bg-neutral-800"
					value={event.color}
					onChange={(e) => handleChange('color', e.target.value)}
				/>
			</label>
			<button
				type="button"
				onClick={handleSubmit}
				className="text-neutral-300 py-1 px-3 bg-indigo-900 hover:bg-indigo-800 rounded transition-all"
			>
				Add
			</button>
		</div>
	);
};
