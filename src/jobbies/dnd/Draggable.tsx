import { useDraggable } from '@dnd-kit/core';

interface Props {
	id: string;
	children: React.ReactNode;
}

export const Draggable = ({ id, children }: Props) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
	const style = transform
		? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, zIndex: 10 }
		: undefined;

	return (
		<div ref={setNodeRef} style={style} {...listeners} {...attributes}>
			{children}
		</div>
	);
};
