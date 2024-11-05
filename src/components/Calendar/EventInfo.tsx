import type { Event } from './types';

const df = { dateStyle: 'full' } as const;
const dtf = { dateStyle: 'full', hour: 'numeric', minute: '2-digit' } as const;

export const EventInfo = ({ event }: { event: Event }) => {
	const from = event.start.toLocaleString('en-US', event.isAllDay ? df : dtf);
	const to = event.end.toLocaleString('en-US', event.isAllDay ? df : dtf);

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-2 text-lg">
				<div
					className={`h-3 w-3 ${event.color} rounded-full`}
					style={{ backgroundColor: event.color }}
				/>
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
