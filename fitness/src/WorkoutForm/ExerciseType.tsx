import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BicepsFlexed, Footprints, type LucideIcon } from 'lucide-react';

export type ExerciseType = 'lift' | 'cardio';

export interface ExerciseTypeMeta {
	name: ExerciseType;
	label: string;
	icon: LucideIcon;
	color: string;
}

export const EXERCISE_TYPE_META: Record<ExerciseType, ExerciseTypeMeta> = {
	lift: {
		name: 'lift',
		label: 'lift',
		icon: BicepsFlexed,
		color: 'text-green-500',
	},
	cardio: {
		name: 'cardio',
		label: 'cardio',
		icon: Footprints,
		color: 'text-green-500',
	},
} as const;

export const TypeDropdown = ({
	type,
	variant = 'default',
	handleClick,
}: {
	type: ExerciseType;
	variant?: 'default' | 'icon';
	handleClick: (type: ExerciseType) => void;
}) => {
	const typeMeta = EXERCISE_TYPE_META[type];

	const OPTIONS = Object.values(EXERCISE_TYPE_META).map((type) => (
		<DropdownMenuItem
			key={type.name}
			onClick={(e) => {
				e.stopPropagation();
				handleClick(type.name);
			}}
		>
			<span className="flex items-center gap-2">
				<type.icon size={18} className={type.color} />
				{type.label}
			</span>
		</DropdownMenuItem>
	));

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="secondary"
					size={variant === 'icon' ? 'icon' : undefined}
					className={`w-full flex items-center gap-2 ${variant === 'icon' ? 'justify-center' : 'justify-start'}`}
				>
					<typeMeta.icon size={18} className={typeMeta.color} />
					{variant === 'default' && typeMeta.label}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">{OPTIONS}</DropdownMenuContent>
		</DropdownMenu>
	);
};
