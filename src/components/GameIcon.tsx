import { ICONS } from '@/constants/icons';
import { cn } from '@/lib/utils';

interface Props {
	icon: keyof typeof ICONS;
	className?: string;
}

export const GameIcon = ({ icon, className }: Props) => {
	const { Icon, color } = ICONS[icon];
	return <Icon className={cn(color, 'h-6 w-6', className)} />;
};
