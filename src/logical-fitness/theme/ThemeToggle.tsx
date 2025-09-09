import { Laptop2, Moon, Sun } from 'lucide-react';
import { useTheme } from '../components/theme-provider';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

export function ThemeToggle() {
	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="flex items-center p-1 border border-neutral-600 rounded cursor-pointer">
				<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
				<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			</DropdownMenuTrigger>
			<DropdownMenuPortal>
				<DropdownMenuContent>
					<DropdownMenuItem onClick={() => setTheme('light')}>
						<Sun className="transition-all" />
						Light
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme('dark')}>
						<Moon className="transition-all" />
						Dark
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme('system')}>
						<Laptop2 />
						System
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenuPortal>
		</DropdownMenu>
	);
}
