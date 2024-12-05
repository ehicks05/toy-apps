import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ReactNode } from 'react';
import { MdDragIndicator } from 'react-icons/md';

interface Props {
	id: string;
	children: ReactNode;
}

export const SortableItem = ({ id, children }: Props) => {
	const { setNodeRef, transform, transition, attributes, listeners } = useSortable({
		id,
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const handle = (
		<MdDragIndicator
			className="text-neutral-500 dark:text-neutral-400 focus:outline-none touch-none p-1"
			size={32}
			{...attributes}
			{...listeners}
		/>
	);

	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			{children}
		</div>
	);
};
