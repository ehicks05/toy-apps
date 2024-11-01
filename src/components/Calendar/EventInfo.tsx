import { type Event } from './events';

export const ActiveEvent = ({ event }: { event: Event }) => {
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
				from {`${df.format(event.start)} at ${dtf.format(event.start)}`} to{' '}
				{`${df.format(event.end)} at ${dtf.format(event.end)}`}
			</div>
		</div>
	);
};
