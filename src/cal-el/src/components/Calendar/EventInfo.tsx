import { Edit, NotebookText, Trash, X } from 'lucide-react';
import { useEvents } from '@/hooks/useEvents';
import type { Event } from './types';
import { getTimeIntervalLabel } from './utils/timeIntervalLabels';

interface EventInfoProps {
	event: Event;
	enableEditMode: () => void;
	close: () => void;
}

export const EventInfo = ({ event, enableEditMode, close }: EventInfoProps) => {
	const { removeEvent } = useEvents();

	const datetimeLabel = getTimeIntervalLabel(event);

	return (
		<div className="flex flex-col gap-2">
			<div className="flex justify-end gap-2">
				<button type="button" onClick={enableEditMode}>
					<Edit size={16} />
				</button>
				<button type="button" onClick={() => removeEvent(event.id)}>
					<Trash size={16} />
				</button>
				<button type="button" onClick={close} className="ml-2">
					<X size={16} />
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
