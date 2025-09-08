import { useDroppable } from '@dnd-kit/core';

interface Props {
	id: string;
	children: React.ReactNode;
}

export const Droppable = ({ id, children }: Props) => {
	const { isOver, setNodeRef } = useDroppable({ id });

	return (
		<div
			ref={setNodeRef}
			className={`w-full h-full ${isOver ? 'bg-neutral-800' : undefined}`}
		>
			{children}
		</div>
	);
};
