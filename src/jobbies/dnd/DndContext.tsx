import { JobCard } from '@/jobbies/app/JobCard';
import { useJobs } from '@/jobbies/hooks/useJobs';
import {
	DndContext,
	type DragEndEvent,
	type DragOverEvent,
	DragOverlay,
	type DragStartEvent,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';

const COLUMNS = ['new', 'in_progress', 'concluded'];

export const MyDndContext = ({ children }: { children: React.ReactNode }) => {
	const { jobs, updateJobs, updateJob, findById } = useJobs();
	const [activeId, setActiveId] = useState<string | null>(null);
	const activeJob = activeId ? findById(activeId) : undefined;

	function handleDragStart(event: DragStartEvent) {
		setActiveId(String(event.active.id));
	}

	const handleDragOver = (event: DragOverEvent) => {
		const { over, active } = event;
		const overId = over?.id ? String(over.id) : undefined;

		if (!overId) return;

		const overJob = findById(overId);
		const updateColumn = overJob?.stage !== activeJob?.stage;

		if (COLUMNS.includes(overId) || updateColumn) {
			const updatedStage = overJob ? overJob.stage : overId;
			updateJob(String(active.id), { stage: updatedStage });
		}
	};

	const handleDragEnd = (event: DragEndEvent) => {
		setActiveId(null);
		const { over, active } = event;

		if (over === null || active === null) return;

		if (active.id !== over.id) {
			const oldIndex = jobs.findIndex((o) => o.id === active.id);
			const newIndex = jobs.findIndex((o) => o.id === over.id);
			const updatedJobs = arrayMove(jobs, oldIndex, newIndex).map((o, i) => ({
				...o,
				index: i,
			}));
			updateJobs(updatedJobs);
		}
	};

	return (
		<DndContext
			onDragStart={handleDragStart}
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}
		>
			{children}
			<DragOverlay>
				{activeJob ? (
					<table className="w-full">
						<tbody>
							<tr>
								<JobCard job={activeJob} />
							</tr>
						</tbody>
					</table>
				) : null}
			</DragOverlay>
		</DndContext>
	);
};
