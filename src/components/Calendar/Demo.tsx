import { useState } from 'react';
import { EventForm } from './EventForm';
import { EVENTS } from './data';
import { ActiveEvent } from './EventInfo';
import { Calendar } from './Calendar';

export const Demo = () => {
	const [isShowWeekend, setIsShowWeekend] = useState(true);
	const [events, setEvents] = useState(EVENTS);
	const [activeEventId, setActiveEventId] = useState<string | undefined>(undefined);
	const activeEvent = activeEventId && events.find((e) => e.id === activeEventId);

	const date = new Date();

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
		</div>
	);
};
