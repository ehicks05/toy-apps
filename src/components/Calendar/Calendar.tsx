import { useSettings } from '@/hooks';
import { useEvents } from '@/hooks/useEvents';
import { chunk, sum } from 'lodash-es';
import { useState } from 'react';
import type { Temporal } from 'temporal-polyfill';
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

	return (
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
						const eventsInDay = eventsInWeek.filter((event) =>
							event.start.toPlainDate().equals(day.toPlainDate()),
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

					return days.map((date) => {
						const eventsInDay = eventsInWeek
							.filter((event) =>
								event.start.toPlainDate().equals(date.toPlainDate()),
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
	);
};
