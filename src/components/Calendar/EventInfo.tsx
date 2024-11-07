import { useEvents } from '@/hooks/useEvents';
import { Edit, Trash } from 'lucide-react';
import { Temporal } from 'temporal-polyfill';
import type { Event } from './types';

/* cases:
SINGLE DAY:
1. partial day: 					 		Tuesday, November 12 ⋅ 10:00am – 8:30pm
1a. partial day next year: 		Tuesday, January 21, 2025 ⋅ 10:00 – 10:30am
2. full day: 									Wednesday, November 13
2a. full day next year: 			Monday, January 20, 2025




MULTI DAY:
4. two full days: 						November 13 – 14, 2024
4a. two full days month span: October 31 – November 1, 2024
4b. two full days year span: 	December 31, 2024 – January 1, 2025
3. two partial days: 					November 13, 2024, 1:30pm – November 14, 2024, 2:30pm
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
	// if (!event.isAllDay) {
	// 	const [start, end] = [event.start, event.end].map((d) =>
	// 		d
	// 			.toLocaleString('en-US', {
	// 				dateStyle: 'long',
	// 				timeStyle: 'short',
	// 			})
	// 			.replace(' at ', ', ')
	// 			.replace(' PM', 'pm')
	// 			.replace(' AM ', 'am'),
	// 	);

	// 	return `${start} - ${end}`;
	// }

	/*
	MULTI DAY:
	4. two full days: 						November 13 – 14, 2024
	4a. two full days month span: October 31 – November 1, 2024
	4b. two full days year span: 	December 31, 2024 – January 1, 2025
	3. two partial days: 					November 13, 2024, 1:30pm – November 14, 2024, 2:30pm
	*/

	const isSameMonth = event.start.month === event.end.month;
	const isSameYear = event.start.year === event.end.year;

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
		.map((o) => (event.isAllDay ? '' : ` ${o}`));

	return `${startMonth}${startDay}${startYear}${startTime} - ${endMonth}${endDay}${endYear}${endTime}`;
};

const DISPLAY_MODES = {
	singleDay: (event: Event) => getSingleDayLabel(event),
	multipleDay: (event: Event) => getMultipleDayLabel(event),
};

export const EventInfo = ({
	event,
	enableEditMode,
}: { event: Event; enableEditMode: () => void }) => {
	const { removeEvent } = useEvents();
	const from = event.start.toLocaleString();
	const to = event.end.toLocaleString();

	const isSingleDay = event.start.toPlainDate().equals(event.end.toPlainDate());
	const mode = isSingleDay ? 'singleDay' : 'multipleDay';

	const datetimeLabel = DISPLAY_MODES[mode](event);

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
			<div className="border border-neutral-600 -mx-2" />
			<div className="flex items-center gap-2 text-lg">
				<div
					className={`h-3 w-3 ${event.color} rounded-full`}
					style={{ backgroundColor: event.color }}
				/>
				{event.label}
			</div>
			<div className="text-sm">{event.description}</div>
			<div className="text-sm">{datetimeLabel}</div>
		</div>
	);
};
