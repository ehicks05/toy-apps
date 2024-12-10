import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ReactNode } from 'react';

interface Props {
	id: string;
	children: ReactNode;
}

export const SortableItem = ({ id, children }: Props) => {
	const { setNodeRef, transform, transition, attributes, listeners, isDragging } =
		useSortable({
			id,
		});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? '25%' : '100%',
	};

	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			{children}
		</div>
	);
};
