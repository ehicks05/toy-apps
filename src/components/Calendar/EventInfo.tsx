import { useEvents } from '@/hooks/useEvents';
import { Edit, Trash } from 'lucide-react';
import type { Event } from './types';

/* cases:
1. partial day: Tuesday, November 12 ⋅ 10:00am – 8:30pm
1a. partial day next year: Tuesday, January 21, 2025⋅10:00 – 10:30am
2. full day: Wednesday, November 13
2a. full day next year: Monday, January 20, 2025
3. two full days: November 13 – 14, 2024
4. two partial days: November 13, 2024, 1:30pm – November 14, 2024, 2:30pm
*/

export const EventInfo = ({
	event,
	enableEditMode,
}: { event: Event; enableEditMode: () => void }) => {
	const { removeEvent } = useEvents();
	const from = event.start.toLocaleString();
	const to = event.end.toLocaleString();

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
			<div className="text-sm text-center">
				{from}
				<div> - to - </div>
				{to}
			</div>
		</div>
	);
};
