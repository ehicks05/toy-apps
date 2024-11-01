import { useSettings } from '@/hooks';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { LucideSettings } from 'lucide-react';
import { DropdownMenuCheckboxItem } from '../ui/dropdown-menu';

export const CalendarSettingsMenu = () => {
	const { isShowWeekend, setIsShowWeekend } = useSettings();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<LucideSettings />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuCheckboxItem
					checked={isShowWeekend}
					onCheckedChange={(isShowWeekend) => setIsShowWeekend(isShowWeekend)}
				>
					Show Weekend?
				</DropdownMenuCheckboxItem>
				<DropdownMenuItem>Billing</DropdownMenuItem>
				<DropdownMenuItem>Team</DropdownMenuItem>
				<DropdownMenuItem>Subscription</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
