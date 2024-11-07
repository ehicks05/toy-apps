import { useEvents } from '@/hooks/useEvents';
import {
	DndContext,
	type DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	pointerWithin,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { Temporal } from 'temporal-polyfill';

export const MyDndContext = ({ children }: { children: React.ReactNode }) => {
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
		if (!dateString || typeof dateString !== 'string') return;
		const newDate = Temporal.PlainDateTime.from(dateString);

		const eventId = active.id;
		if (typeof eventId !== 'string') return;
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

	return (
		<DndContext
			onDragEnd={handleDragEnd}
			sensors={sensors}
			collisionDetection={pointerWithin}
		>
			{children}
		</DndContext>
	);
};
