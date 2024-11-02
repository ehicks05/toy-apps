import type { Event } from './events';

export const EventInfo = ({ event }: { event: Event }) => {
	const style = {
		backgroundColor: event.color.startsWith('#') ? event.color : undefined,
	};

	const df = Intl.DateTimeFormat('en-US', {
		month: 'numeric',
		day: 'numeric',
		year: 'numeric',
	});
	const dtf = Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' });

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-2 text-lg">
				<div className={`h-3 w-3 ${event.color} rounded-full`} style={style} />
				{event.label}
			</div>
			<div className="text-sm">{event.description}</div>
			<div className="text-sm">
				{`${event.start.toDateString()} at ${dtf.format(event.start)}`}
				<div> - to - </div>
				{`${event.end.toDateString()} at ${dtf.format(event.end)}`}
			</div>
		</div>
	);
};
