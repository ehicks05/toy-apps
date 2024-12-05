import { useJobs } from '@/hooks/useJobs';
import {
	DndContext,
	type DragEndEvent,
	type DragOverEvent,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

export const MyDndContext = ({ children }: { children: React.ReactNode }) => {
	const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

	const { setJobs, updateById, findById } = useJobs();

	const handleDragOver = (event: DragOverEvent) => {
		console.log(event);
		const { over, active } = event;

		if (!over?.id || typeof over.id !== 'string') return;

		const COLUMNS = ['new', 'in_progress', 'concluded'];
		const isOverAColumn = COLUMNS.includes(over.id);
		const isOverAJobInDifferentColumn = findById(over.id);

		if (
			['new', 'in_progress', 'concluded'].includes(over.id) &&
			active.id !== over.id
		) {
			updateById(active.id, over.id);
		}
	};

	const handleDragEnd = (event: DragEndEvent) => {
		console.log(event);
		const { over, active } = event;

		if (over === null || active === null) return;
		console.log('ok');

		if (active.id !== over.id) {
			setJobs((items) => {
				const oldIndex = items.findIndex((o) => o.id === active.id);
				const newIndex = items.findIndex((o) => o.id === over.id);

				return arrayMove(items, oldIndex, newIndex);
			});
		}
	};

	return (
		<DndContext
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}
			sensors={sensors}
			// collisionDetection={pointerWithin}
		>
			{children}
		</DndContext>
	);
};
