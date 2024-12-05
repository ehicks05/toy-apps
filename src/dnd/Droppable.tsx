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
			className={`flex flex-col w-full h-full flex-grow ${isOver ? 'bg-red-500' : ''}`}
		>
			{children}
		</div>
	);
};
