import { useState } from 'react';
import { Temporal } from 'temporal-polyfill';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { EventChip } from './EventChip';
import { EventForm } from './EventForm';
import type { Event } from './types';

interface EventsProps {
	date: Temporal.ZonedDateTime;
	events: AnnotatedEvent[];
}

const Events = ({ date, events }: EventsProps) => {
	if (events.length === 0) return null;

	return (
		<div className="relative flex flex-col gap-1">
			{events.map((e, i) => {
				const width = e.days * 100;
				return (
					<EventChip
						key={e.id}
						date={date}
						event={e}
						lane={e.lane}
						i={i}
						width={width}
					/>
				);
			})}
		</div>
	);
};

interface AnnotatedEvent extends Event {
	lane: number;
	days: number;
}

interface DayProps {
	date: Temporal.ZonedDateTime;
	eventsInDay: AnnotatedEvent[];
}

export const Day = ({ date, eventsInDay }: DayProps) => {
	const isCurrentDay = date.toPlainDate().equals(Temporal.Now.plainDateISO());
	const dateLabel =
		date.day === 1
			? date.toLocaleString('en-US', { month: 'short', day: 'numeric' })
			: date.day;

	const border = isCurrentDay ? 'border-blue-800' : 'border-neutral-800';

	return (
		<Droppable id={date.toPlainDate().toString()}>
			<div className={`flex flex-col min-h-44 border-y-2 ${border} transition-all`}>
				<div className="pl-2 pt-2 text-sm md:text-base">{dateLabel}</div>
				<Events date={date} events={eventsInDay} />

				<EventFormPopover date={date} />
			</div>
		</Droppable>
	);
};

const EventFormPopover = ({ date }: { date: Temporal.ZonedDateTime }) => {
	const [isOpen, setIsOpen] = useState(false);
	const close = () => setIsOpen(false);

	return (
		<Popover modal open={isOpen}>
			<PopoverTrigger
				type="button"
				onClick={() => setIsOpen(true)}
				className="w-full flex-grow"
			/>
			<PopoverContent className="p-0 border-none" onPointerDownOutside={close}>
				<div className="p-2 rounded bg-neutral-800">
					<EventForm date={date} close={close} />
				</div>
			</PopoverContent>
		</Popover>
	);
};

import { useDroppable } from '@dnd-kit/core';

const Droppable = ({ id, children }: { id: string; children: React.ReactNode }) => {
	const { isOver, setNodeRef } = useDroppable({ id });

	return (
		<div
			ref={setNodeRef}
			className={`w-full h-full ${isOver ? 'bg-neutral-800' : undefined}`}
		>
			{children}
		</div>
	);
};
