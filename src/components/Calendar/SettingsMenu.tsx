import { useSettings } from '@/hooks';
import { VIEWS } from '@/hooks/useSettings';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { LucideSettings } from 'lucide-react';
import {
	DropdownMenuCheckboxItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
} from '../ui/dropdown-menu';

export const CalendarSettingsMenu = () => {
	const { isShowWeekend, setIsShowWeekend, view, setView } = useSettings();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<LucideSettings />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="flex flex-col gap-2 p-2 bg-neutral-800">
				<DropdownMenuRadioGroup value={view} onValueChange={setView}>
					{VIEWS.map((view) => (
						<DropdownMenuRadioItem
							key={view}
							value={view}
							className="hover:bg-neutral-700"
						>
							{view}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
				<DropdownMenuSeparator className="border border-neutral-700" />
				<DropdownMenuCheckboxItem
					checked={isShowWeekend}
					onCheckedChange={(isShowWeekend) => setIsShowWeekend(isShowWeekend)}
					className="hover:bg-neutral-700"
				>
					Show Weekend?
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
