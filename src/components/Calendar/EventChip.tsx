import { Temporal } from 'temporal-polyfill';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { EventInfo } from './EventInfo';
import type { Event } from './types';

const LANE_OFFSETS: Record<number, string> = {
	0: 'absolute top-0',
	1: 'absolute top-8',
	2: 'absolute top-16',
	3: 'absolute top-24',
	4: 'absolute top-32',
};

interface Props {
	date: Temporal.ZonedDateTime;
	event: Event;
	lane: number;
	width: number;
}

export const EventChip = ({ date, event, lane, width }: Props) => {
	const isPast =
		Temporal.ZonedDateTime.compare(event.end, Temporal.Now.zonedDateTimeISO()) < 0;
	const textColor = isPast ? 'text-neutral-300' : '';
	const isFirstDay = date.toPlainDate().equals(event.start.toPlainDate());
	const isLastDay = date.toPlainDate().equals(event.end.toPlainDate());
	const isDotChip = isFirstDay && isLastDay && !event.isAllDay;

	const offsetMargin = LANE_OFFSETS[lane];

	console.log({ event, offsetMargin });

	const shared = `p-1 pl-2 ${offsetMargin} w-[${width}%] h-6 md:h-7 rounded line-clamp-1 text-xs md:text-sm text-left ${textColor} cursor-pointer hover:brightness-110 transition-all`;
	const classes =
		isFirstDay && isLastDay ? `${shared} hover:bg-neutral-700` : `${shared}`;
	const bgColor = { backgroundColor: event.color };

	const innerContent = isDotChip ? (
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
				style={{ ...(isDotChip ? undefined : bgColor), ...{ width: `${width}%` } }}
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
