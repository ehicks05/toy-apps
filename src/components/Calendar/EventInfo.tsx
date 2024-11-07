import { useEvents } from '@/hooks/useEvents';
import { Edit, NotebookText, Trash } from 'lucide-react';
import { Temporal } from 'temporal-polyfill';
import type { Event } from './types';

/* cases:
SINGLE DAY:
1. partial day: 					 		Tuesday, November 12 ⋅ 10:00am – 8:30pm
2. partial day next year: 		Tuesday, January 21, 2025 ⋅ 10:00 – 10:30am
3. full day: 								Wednesday, November 13
4. full day next year: 			Monday, January 20, 2025

MULTI DAY:
1. two partial days: 					November 13, 2024, 1:30pm – November 14, 2024, 2:30pm
2. two full days year span: 	December 31, 2024 – January 1, 2025
3. two full days month span: October 31 – November 1, 2024
4. two full days: 						November 13 – 14, 2024
*/

const getTimeLabel = (date: Temporal.ZonedDateTime) =>
	date
		.toLocaleString('en-US', {
			hour: 'numeric',
			minute: '2-digit',
		})
		.replace(' ', '')
		.toLocaleLowerCase();

const getSingleDayLabel = (event: Event) => {
	const includeYear = event.start.year !== Temporal.Now.zonedDateTimeISO().year;

	const date = event.start.toLocaleString('en-US', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		year: includeYear ? 'numeric' : undefined,
	});

	const [from, to] = [event.start, event.end].map(getTimeLabel);

	const time = event.isAllDay ? '' : ` · ${from} - ${to}`;

	return `${date}${time}`;
};

const getMultipleDayLabel = (event: Event) => {
	const [startMonth, endMonth] = [event.start, event.end]
		.map((date) => date.toLocaleString('en-US', { month: 'long' }))
		.map((o) => `${o}`);

	const [startYear, endYear] = [event.start, event.end]
		.map((date) => date.toLocaleString('en-US', { year: 'numeric' }))
		.map((o) => `, ${o}`);

	const [startDay, endDay] = [event.start, event.end]
		.map((date) => date.toLocaleString('en-US', { day: 'numeric' }))
		.map((o) => ` ${o}`);

	const [startTime, endTime] = [event.start, event.end]
		.map(getTimeLabel)
		.map((o) => `, ${o}`);

	const isMonthSpanning = event.start.month !== event.end.month;
	const isYearSpanning = event.start.year !== event.end.year;

	if (!event.isAllDay) {
		return `${startMonth}${startDay}${startYear}${startTime} - ${endMonth}${endDay}${endYear}${endTime}`;
	}
	if (isYearSpanning) {
		return `${startMonth}${startDay}${startYear} - ${endMonth}${endDay}${endYear}`;
	}
	if (isMonthSpanning) {
		return `${startMonth}${startDay} - ${endMonth}${endDay}${endYear}`;
	}

	return `${startMonth}${startDay} - ${endDay}${endYear}`;
};

export const EventInfo = ({
	event,
	enableEditMode,
}: { event: Event; enableEditMode: () => void }) => {
	const { removeEvent } = useEvents();

	const datetimeLabel = event.start.toPlainDate().equals(event.end.toPlainDate())
		? getSingleDayLabel(event)
		: getMultipleDayLabel(event);

	return (
		<div className="flex flex-col gap-2">
			<div className="flex justify-end gap-2">
				<button type="button" onClick={enableEditMode}>
					<Edit size={16} />
				</button>
				<button type="button" onClick={() => removeEvent(event.id)}>
					<Trash size={16} />
				</button>
			</div>
			<div className="border border-neutral-700 -mx-2" />
			<div className="flex items-baseline gap-2 text-lg">
				<div
					className={`h-3 w-3 ${event.color} rounded-full`}
					style={{ backgroundColor: event.color }}
				/>
				<div className="flex flex-col">
					{event.label}
					<div className="text-xs">{datetimeLabel}</div>
				</div>
			</div>
			{event.description && (
				<div className="flex items-center gap-2 text-xs">
					<NotebookText size={14} className="w-3 h-3" />
					{event.description}
				</div>
			)}
		</div>
	);
};
