import { sum } from 'lodash-es';
import { Temporal } from 'temporal-polyfill';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { EventChip } from './EventChip';
import { EventForm } from './EventForm';
import type { Event } from './types';

interface DayProps {
	date: Temporal.ZonedDateTime;
	events: Event[];
	setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
	eventLanes: Record<string, number>;
	eventDayMasks: Record<string, number[]>;
}

export const Day = ({
	date,
	events,
	setEvents,
	eventLanes,
	eventDayMasks,
}: DayProps) => {
	const isCurrentDay = date.toPlainDate().equals(Temporal.Now.plainDateISO());
	const dateLabel =
		date.day === 1
			? date.toLocaleString('en-US', { month: 'short', day: 'numeric' })
			: date.day;

	const border = isCurrentDay ? 'border-blue-800' : 'border-neutral-800';

	return (
		<div
			className={`flex flex-col min-h-44 border-y-2 ${border} hover:bg-neutral-800 transition-all`}
		>
			<div>
				<div className="pl-2 pt-2 text-sm md:text-base">{dateLabel}</div>
				{events.length > 0 && (
					<div className="relative flex flex-col gap-1">
						{events.map((e, i) => {
							const lane = eventLanes[e.id];
							const dayMask = eventDayMasks[e.id];
							const width = sum(dayMask) * 100;
							return (
								<EventChip
									key={e.id}
									date={date}
									event={e}
									lane={lane}
									width={width}
								/>
							);
						})}
					</div>
				)}
			</div>

			<Popover>
				<PopoverTrigger type="button" className="w-full flex-grow" />
				<PopoverContent className="p-0 border-none">
					<div className="p-2 rounded bg-neutral-700">
						<EventForm date={date} events={events} setEvents={setEvents} />
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};
