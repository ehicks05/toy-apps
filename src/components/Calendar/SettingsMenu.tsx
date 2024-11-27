import { useSettings } from '@/hooks';
import { VIEWS } from '@/hooks/useSettings';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import {
	DropdownMenuCheckboxItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
} from '../ui/dropdown-menu';

export const CalendarSettingsMenu = () => {
	const { isShowWeekend, setIsShowWeekend, view, setView } = useSettings();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="font-semibold text-sm">
				{view}
			</DropdownMenuTrigger>
			<DropdownMenuContent className="flex flex-col gap-2 p-2 font-normal bg-neutral-700 z-10">
				{/* @ts-expect-error */}
				<DropdownMenuRadioGroup value={view} onValueChange={setView}>
					{VIEWS.map((view) => (
						<DropdownMenuRadioItem
							key={view}
							value={view}
							className="hover:bg-neutral-600"
						>
							{view.slice(0, 1).toUpperCase() + view.slice(1)}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
				<DropdownMenuSeparator className="border border-neutral-600" />
				<DropdownMenuCheckboxItem
					checked={isShowWeekend}
					onCheckedChange={(isShowWeekend) => setIsShowWeekend(isShowWeekend)}
					className="hover:bg-neutral-600"
				>
					Show Weekends
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
