import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { EventForm } from './EventForm';
import { EventInfo } from './EventInfo';
import type { Event } from './types';

const MMd = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });

export const EventChip = ({
	date,
	event,
}: {
	date: Date;
	event: Event;
}) => {
	const isPast = event.dates.end.getTime() < new Date().getTime();
	const text = isPast ? 'text-neutral-300' : '';
	const isFirstDay = event.dates.start.toDateString() === date.toDateString();
	const isLastDay = event.dates.end.toDateString() === date.toDateString();

	const left = isFirstDay ? 'rounded-l' : '-ml-2';
	const right = isLastDay ? 'rounded-r' : '-mr-2';

	const conditional = `${left} ${right} ${text}`;

	const style = {
		backgroundColor: event.color,
	};

	if (isFirstDay && isLastDay) {
		return (
			<Popover modal>
				<PopoverTrigger
					key={event.id}
					type="button"
					className={
						'p-1 pl-2 h-6 md:h-7 line-clamp-1 text-xs md:text-sm text-left cursor-pointer hover:brightness-110 hover:bg-neutral-800 transition-all'
					}
				>
					<div className="flex gap-2 items-center">
						<div className={`h-3 w-3 rounded-full ${event.color}`} style={style} />
						{event.label}
					</div>
				</PopoverTrigger>
				<PopoverContent className="p-0 border-none">
					<div className="p-2 rounded bg-neutral-700">
						<EventInfo event={event} />
					</div>
				</PopoverContent>
			</Popover>
		);
	}

	return (
		<Popover>
			<PopoverTrigger
				key={event.id}
				type="button"
				className={`p-1 pl-2 h-6 md:h-7 line-clamp-1 text-xs md:text-sm text-left cursor-pointer hover:brightness-110 transition-all ${conditional}`}
				style={style}
			>
				{isFirstDay && event.label}
			</PopoverTrigger>
			<PopoverContent className="p-0 border-none">
				<div className="p-2 rounded bg-neutral-700">
					<EventInfo event={event} />
				</div>
			</PopoverContent>
		</Popover>
	);
};

interface DayProps {
	date: Date;
	events: Event[];
	setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

export const Day = ({ date, events, setEvents }: DayProps) => {
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
						{events.map((e) => (
							<EventChip key={e.id} date={date} event={e} />
						))}
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
