import { Palmtree } from 'lucide-react';
import { APP_NAME } from '@/jobbies/constants/app';

const Logo = () => (
	<div className="flex-shrink-0 flex items-center">
		<div className="flex items-center gap-1 text-orange-500">
			<Palmtree className="inline h-8 w-auto" />
			<span className="mt-1 hidden sm:inline font-bold text-3xl font-logo">
				{APP_NAME}
			</span>
		</div>
	</div>
);

export function Header() {
	return (
		<div className="flex items-center justify-between h-16 max-w-screen-2xl mx-auto px-2 w-full">
			<Logo />
		</div>
	);
}
