import type { Event } from './types';

export const EventInfo = ({ event }: { event: Event }) => {
	const style = {
		backgroundColor: event.color.startsWith('#') ? event.color : undefined,
	};

	const df = Intl.DateTimeFormat('en-US', { dateStyle: 'full' });
	const dtf = Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' });

	const from = `${df.format(event.dates.start)}${event.isAllDay ? '' : dtf.format(event.times.start)}`;
	const to = `${df.format(event.dates.end)}${event.isAllDay ? '' : dtf.format(event.times.end)}`;

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-2 text-lg">
				<div className={`h-3 w-3 ${event.color} rounded-full`} style={style} />
				{event.label}
			</div>
			<div className="text-sm">{event.description}</div>
			<div className="text-sm text-center">
				{from}
				<div> - to - </div>
				{to}
			</div>
		</div>
	);
};
