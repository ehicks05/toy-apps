import { Temporal } from 'temporal-polyfill';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { EventInfo } from './EventInfo';
import type { Event } from './types';

const LANE_OFFSETS: Record<number, string> = {
	0: '',
	1: 'mt-8',
	2: 'mt-16',
	3: 'mt-24',
};

interface Props {
	date: Temporal.ZonedDateTime;
	event: Event;
	laneOffset: number;
}

export const EventChip = ({ date, event, laneOffset }: Props) => {
	const isPast =
		Temporal.ZonedDateTime.compare(event.end, Temporal.Now.zonedDateTimeISO()) < 0;
	const textColor = isPast ? 'text-neutral-300' : '';
	const isFirstDay = date.toPlainDate().equals(event.start.toPlainDate());
	const isLastDay = date.toPlainDate().equals(event.end.toPlainDate());

	const offsetMargin = LANE_OFFSETS[laneOffset];

	const left = isFirstDay ? 'rounded-l' : '-ml-2';
	const right = isLastDay ? 'rounded-r' : '-mr-2';
	const shared = `p-1 pl-2 ${offsetMargin} h-6 md:h-7 line-clamp-1 text-xs md:text-sm text-left ${textColor} cursor-pointer hover:brightness-110 transition-all`;
	const classes =
		isFirstDay && isLastDay
			? `${shared} rounded hover:bg-neutral-700`
			: `${shared} ${left} ${right}`;
	const bgColor = { backgroundColor: event.color };

	const innerContent =
		isFirstDay && isLastDay ? (
			<div className="flex gap-2 items-center">
				<div className="h-3 w-3 shrink-0 rounded-full" style={bgColor} />
				<span className="line-clamp-1">{event.label}</span>
			</div>
		) : isFirstDay ? (
			event.label
		) : null;

	return (
		<Popover>
			<PopoverTrigger
				key={event.id}
				type="button"
				className={classes}
				style={isFirstDay && isLastDay ? undefined : bgColor}
			>
				{innerContent}
			</PopoverTrigger>
			<PopoverContent className="p-0 border-none">
				<div className="p-2 rounded bg-neutral-700">
					<EventInfo event={event} />
				</div>
			</PopoverContent>
		</Popover>
	);
};
