import type { Event } from './events';

interface DayProps {
	date: Date;
	events: Event[];
	setActiveEventId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const MMd = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });

export const EventChip = ({
	date,
	event,
	setActiveEventId,
}: {
	date: Date;
	event: Event;
	setActiveEventId: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
	const isPast = event.end.getTime() < new Date().getTime();
	const text = isPast ? 'text-neutral-300' : '';
	const isFirstDay = event.start.toDateString() === date.toDateString();
	const isLastDay = event.end.toDateString() === date.toDateString();

	const left = isFirstDay ? 'rounded-l' : '-ml-2';
	const right = isLastDay ? 'rounded-r' : '-mr-2';

	const conditional = `${left} ${right} ${text} ${event.color.startsWith('#') ? undefined : event.color}`;

	const style = {
		backgroundColor: event.color.startsWith('#') ? event.color : undefined,
	};

	return (
		<button
			key={event.id}
			type="button"
			className={`p-1 pl-2 h-6 md:h-7 line-clamp-1 text-xs md:text-sm text-left cursor-pointer hover:brightness-110 transition-all ${conditional}`}
			style={style}
			onClick={() => setActiveEventId(event.id)}
		>
			{isFirstDay && event.label}
		</button>
	);
};

export const Day = ({ date, events, setActiveEventId }: DayProps) => {
	const isCurrentDay = date.toDateString() === new Date().toDateString();
	const dateLabel = date.getDate() === 1 ? MMd.format(date) : date.getDate();

	const border = isCurrentDay ? 'border-blue-800 border-y-2' : 'border-neutral-800';

	return (
		<div
			className={`p-2 min-h-32 border-y ${border} hover:bg-neutral-800 transition-all`}
		>
			<div className="text-sm md:text-base mb-1">{dateLabel}</div>
			{events.length > 0 && (
				<div className="flex flex-col gap-1">
					{events.map((e) => (
						<EventChip
							key={e.id}
							date={date}
							event={e}
							setActiveEventId={setActiveEventId}
						/>
					))}
				</div>
			)}
		</div>
	);
};
