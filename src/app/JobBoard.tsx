import { MyDndContext } from '@/dnd/DndContext';
import { Droppable } from '@/dnd/Droppable';
import { SortableItem } from '@/dnd/SortableItem';
import { useJobs } from '@/hooks/useJobs';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { JobCard } from './JobCard';
import { STAGES } from './data';
import type { Stage } from './types';

const Column = ({ stage }: { stage: Stage }) => {
	const { jobs: _jobs } = useJobs();
	const jobs = _jobs.filter((o) => o.stage === stage.name);
	const { isOver, setNodeRef } = useDroppable({ id: stage.name });

	return (
		<SortableContext id={stage.name} items={jobs}>
			<div
				ref={setNodeRef}
				className="flex flex-col flex-grow w-full bg-neutral-950"
			>
				<div>{stage.label}</div>
				<div className="flex flex-col gap-4">
					{jobs.map((job) => (
						<SortableItem id={job.id} key={job.id}>
							<JobCard job={job} />
						</SortableItem>
					))}
				</div>
			</div>
		</SortableContext>
	);
};

export const JobBoard = () => {
	return (
		<MyDndContext>
			<div className="flex flex-col flex-grow w-full h-full max-w-screen-2xl mx-auto">
				<div className="flex gap-4 h-full flex-grow overflow-x-auto">
					{STAGES.map((stage) => (
						<Column key={stage.name} stage={stage} />
					))}
				</div>
			</div>
		</MyDndContext>
	);
};
