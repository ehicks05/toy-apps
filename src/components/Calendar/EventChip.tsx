import type { Temporal } from 'temporal-polyfill';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { EventInfo } from './EventInfo';
import type { Event } from './types';

const LANE_OFFSETS: Record<number, string> = {
	0: 'mt-0',
	1: 'mt-8',
	2: 'mt-16',
	3: 'mt-24',
	4: 'mt-32',
};

interface Props {
	date: Temporal.ZonedDateTime;
	event: Event;
	lane: number;
	i: number;
	width: number;
}

export const EventChip = ({ date, event, lane, i, width }: Props) => {
	const isFirstDay = date.toPlainDate().equals(event.start.toPlainDate());
	const isLastDay = date.toPlainDate().equals(event.end.toPlainDate());
	const isDotChip = isFirstDay && isLastDay && !event.isAllDay;

	const offsetMargin = LANE_OFFSETS[lane - i];

	const shared = `p-1 pl-2 ${offsetMargin} h-6 md:h-7 rounded line-clamp-1 text-xs md:text-sm text-left cursor-pointer hover:brightness-110 transition-all`;
	const classes = isDotChip ? `${shared} hover:bg-neutral-800` : `${shared}`;
	const bgColor = { backgroundColor: event.color };

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
						...(isDotChip ? undefined : bgColor),
						...{ width: `${width}%` },
					}}
					onClick={() => setPopoverOpen(true)}
				>
					{innerContent}
				</PopoverTrigger>
				<PopoverContent
					className="p-0 border-none"
					onPointerDownOutside={closePopover}
				>
					<div className="p-2 rounded bg-neutral-700">
						{isEditMode ? (
							<EventForm date={date} event={event} close={closePopover} />
						) : (
							<EventInfo event={event} enableEditMode={enableEditMode} />
						)}
					</div>
				</PopoverContent>
			</Popover>
		</Draggable>
	);
};

import { useDraggable } from '@dnd-kit/core';
import { useState } from 'react';
import { EventForm } from './EventForm';

const Draggable = ({ id, children }: { id: string; children: React.ReactNode }) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
	const style = transform
		? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, zIndex: 10 }
		: undefined;

	return (
		<div ref={setNodeRef} style={style} {...listeners} {...attributes}>
			{children}
		</div>
	);
};
