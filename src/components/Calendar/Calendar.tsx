import { useSettings } from '@/hooks';
import { useEvents } from '@/hooks/useEvents';
import {
	DndContext,
	type DragEndEvent,
	type DragOverEvent,
	KeyboardSensor,
	PointerSensor,
	pointerWithin,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { chunk, sum } from 'lodash-es';
import { useState } from 'react';
import { Temporal } from 'temporal-polyfill';
import { Day } from './Day';
import { MonthMenu } from './MonthMenu';
import { getCalendarDays, getDayNames } from './dates';
import { isOverlapsDay } from './events';

interface Props {
	date: Temporal.ZonedDateTime;
}

export const Calendar = ({ date: _date }: Props) => {
	const { isShowWeekend } = useSettings();
	const { events } = useEvents();
	const cols = isShowWeekend ? 7 : 5;

	const [date, setDate] = useState(_date);

	const dayNames = getDayNames().slice(cols === 7 ? 0 : 1, cols === 7 ? 7 : -1);
	const gridCols = cols === 7 ? 'grid-cols-7' : 'grid-cols-5';
	const monthLabel = date.toLocaleString('en-US', {
		month: 'long',
		year: 'numeric',
	});

	const days = getCalendarDays(date).filter(
		(date) => isShowWeekend || ![0, 6].includes(date.dayOfWeek),
	);

	const weeks = chunk(days, 7).map((week) => {
		const eventsInWeek = events
			.map((event) => {
				const dayMask = [0, 0, 0, 0, 0, 0, 0];
				week.forEach((day, i) => {
					if (isOverlapsDay(event, day)) dayMask[i] = 1;
				});

				return { ...event, dayMask };
			})
			.filter((event) => event.dayMask.some((dayValue) => dayValue !== 0));
		return { days: week, eventsInWeek };
	});

	console.log(weeks);

	return (
		<MyDndContext>
			<div className="w-full border-2 border-neutral-800">
				<div className="p-2 border border-neutral-800 bg-neutral-800 font-semibold text-center">
					<div className="flex justify-between items-center">
						<div className="w-32" /> {/* hack to keep label centered */}
						{monthLabel}
						<MonthMenu date={date} setDate={setDate} _date={_date} />
					</div>
				</div>
				<div className={`w-full grid ${gridCols}`}>
					{dayNames.map((dow) => (
						<div key={dow} className="p-2 border border-neutral-800 bg-neutral-800">
							{dow}
						</div>
					))}

					{weeks.map(({ days, eventsInWeek }) => {
						// find each event's 'swimlane'
						const eventLanes: Record<string, number> = {};
						const eventDayMasks: Record<string, number[]> = {};
						const dailyOffsets = [0, 0, 0, 0, 0, 0, 0];

						days.forEach((day, i) => {
							const eventsInDay = eventsInWeek.filter(
								(event) =>
									event.start.toPlainDate().equals(day.toPlainDate()) ||
									(i === 0 &&
										Temporal.PlainDate.compare(
											event.start.toPlainDate(),
											day.toPlainDate(),
										) < 0),
							);

							eventsInDay.forEach((event) => {
								const offset = dailyOffsets[i];
								const offsetMovingForward = offset + 1;
								eventLanes[event.id] = offset;
								eventDayMasks[event.id] = event.dayMask;

								// update daily offsets
								dailyOffsets.forEach((offset, i) => {
									dailyOffsets[i] = event.dayMask[i]
										? offsetMovingForward
										: dailyOffsets[i];
								});
							});
						});

						return days.map((date, i) => {
							const eventsInDay = eventsInWeek
								.filter(
									(event) =>
										event.start.toPlainDate().equals(date.toPlainDate()) ||
										(i === 0 &&
											Temporal.PlainDate.compare(
												event.start.toPlainDate(),
												date.toPlainDate(),
											) < 0),
								)
								.map((event) => ({
									...event,
									lane: eventLanes[event.id],
									days: sum(eventDayMasks[event.id]),
								}));

							return (
								<Day key={date.toString()} date={date} eventsInDay={eventsInDay} />
							);
						});
					})}
				</div>
			</div>
		</MyDndContext>
	);
};

const MyDndContext = ({ children }: { children: React.ReactNode }) => {
	const pointerSensor = useSensor(PointerSensor, {
		// Require the mouse to move by 10 pixels before activating
		activationConstraint: {
			distance: 10,
		},
	});
	const keyboardSensor = useSensor(KeyboardSensor);
	const sensors = useSensors(pointerSensor, keyboardSensor);

	const { events, setEvents, byId } = useEvents();

	const handleDragEnd = (dragEventEnd: DragEndEvent) => {
		console.log(dragEventEnd);
		const { over, active } = dragEventEnd;
		const dateString = over?.id;
		if (!dateString) return;
		const newDate = Temporal.PlainDateTime.from(dateString);

		const eventId = active.id;
		const event = byId(eventId);
		if (!event) return;

		const updateDelta = event.start.toPlainDate().until(newDate);

		const duration = event.start.until(event.end);

		// patch event.start
		const start = event.start.add(updateDelta);
		// update event.end in a way that maintains the duration
		const end = start.add(duration);

		setEvents(events.map((e) => (e.id === eventId ? { ...e, start, end } : e)));
	};
	const handleDragOver = (event: DragOverEvent) => {
		const { over } = event;
		console.log(event);
	};
	const handleDragStart = (event: DragOverEvent) => {
		const { over } = event;
		console.log(event);
	};

	return (
		<DndContext
			onDragEnd={handleDragEnd}
			// onDragOver={handleDragOver}
			// onDragStart={handleDragStart}
			sensors={sensors}
			collisionDetection={pointerWithin}
		>
			{children}
		</DndContext>
	);
};
