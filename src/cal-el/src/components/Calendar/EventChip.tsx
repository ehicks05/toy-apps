import { useState } from 'react';
import type { Temporal } from 'temporal-polyfill';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Draggable } from './dnd/Draggable';
import { EventForm } from './EventForm';
import { EventInfo } from './EventInfo';
import type { Event } from './types';

const LANE_OFFSETS: Record<number, string> = {
	'-2': '-mt-16',
	'-1': '-mt-8',
	0: '',
	1: 'mt-8',
	2: 'mt-16',
	3: 'mt-24',
	4: 'mt-32',
};

interface Props {
	date: Temporal.ZonedDateTime;
	event: Event;
	laneOffset: number;
	dayCount: number;
}

export const EventChip = ({ date, event, laneOffset, dayCount }: Props) => {
	const isFirstDay = date.toPlainDate().equals(event.start.toPlainDate());
	const isLastDay = date.toPlainDate().equals(event.end.toPlainDate());
	const isDotChip = isFirstDay && isLastDay && !event.isAllDay;

	const offsetMargin = LANE_OFFSETS[laneOffset];

	const shared = `p-1 pl-2 ${offsetMargin} h-6 md:h-7 rounded line-clamp-1 text-xs md:text-sm text-left cursor-pointer hover:brightness-110 transition-all`;
	const classes = isDotChip ? `${shared} hover:bg-neutral-800` : `${shared}`;
	const bgColor = { backgroundColor: event.color };
	const width = { width: `calc(${dayCount * 100}% - 0.25rem)` };

	const innerContent = isDotChip ? (
		<div className="flex gap-2 items-center">
			<div className="h-3 w-3 shrink-0 rounded-full" style={bgColor} />
			<span className="line-clamp-1">{event.label}</span>
		</div>
	) : isFirstDay ? (
		event.label
	) : null;

	const [isEditMode, setIsEditMode] = useState(false);
	const enableEditMode = () => setIsEditMode(true);

	const [isPopoverOpen, setPopoverOpen] = useState(false);
	const closePopover = () => {
		setPopoverOpen(false);
		setIsEditMode(false);
	};

	return (
		<Draggable id={event.id}>
			<Popover modal open={isPopoverOpen}>
				<PopoverTrigger
					key={event.id}
					type="button"
					className={classes}
					style={{
						...width,
						...(isDotChip ? undefined : bgColor),
					}}
					onClick={() => setPopoverOpen(true)}
				>
					{innerContent}
				</PopoverTrigger>
				<PopoverContent
					className="p-0 border-none"
					onPointerDownOutside={closePopover}
				>
					<div className="p-2 rounded bg-neutral-800 shadow-2xl">
						{isEditMode ? (
							<EventForm date={date} event={event} close={closePopover} />
						) : (
							<EventInfo
								event={event}
								enableEditMode={enableEditMode}
								close={closePopover}
							/>
						)}
					</div>
				</PopoverContent>
			</Popover>
		</Draggable>
	);
};
