import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { EventChip } from './EventChip';
import { EventForm } from './EventForm';
import type { Event } from './types';

const MMd = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });

interface DayProps {
	date: Date;
	events: Event[];
	setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
	eventLanes: Record<string, number>;
}

export const Day = ({ date, events, setEvents, eventLanes }: DayProps) => {
	const isCurrentDay = date.toDateString() === new Date().toDateString();
	const dateLabel = date.getDate() === 1 ? MMd.format(date) : date.getDate();

	const border = isCurrentDay ? 'border-blue-800 border-y-2' : 'border-neutral-800';

	return (
		<div
			className={`p-2 min-h-36 border-y-2 ${border} hover:bg-neutral-800 transition-all`}
		>
			<div>
				<div className="text-sm md:text-base mb-1">{dateLabel}</div>
				{events.length > 0 && (
					<div className="flex flex-col gap-1">
						{events.map((e, i) => {
							const lane = eventLanes[e.id];
							const laneOffset = lane - i;

							return (
								<EventChip
									key={e.id}
									date={date}
									event={e}
									laneOffset={laneOffset}
								/>
							);
						})}
					</div>
				)}
			</div>

			<Popover>
				<PopoverTrigger type="button" className="w-full h-full" />
				<PopoverContent className="p-0 border-none">
					<div className="p-2 rounded bg-neutral-700">
						<EventForm date={date} events={events} setEvents={setEvents} />
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};
