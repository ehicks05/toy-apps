import { Home, Sun, Wine } from 'lucide-react';
import { FaBlackTie } from 'react-icons/fa';
import { Link, Route, Routes } from 'react-router-dom';
import { CalElDemo } from './cal-el/src/CalElDemo';
import { CovidCharts } from './covid/CovidCharts';
import Eordle from './eordle/Eordle';
import { EricIdle } from './eric-idle/EricIdle';
import { useFavicon } from './hooks/useFavicon';
import { Hootch } from './hootch';
import Jikan from './jikan/Jikan';
import { Jobbies } from './jobbies';
import { LogicalFitness } from './logical-fitness/main';
import { Sol } from './sol/App';
import { UnitedStatesOfFood as FoodMap } from './united-states-of-food';
import { Weatherman } from './weatherman';

const APPS = [
	{
		name: 'cal-el',
		description: 'calendar',
		component: CalElDemo,
		iconUrl: '/cal-el/android-chrome-512x512.png',
	},
	{
		name: 'eordle',
		description: 'wordle clone',
		component: Eordle,
		iconUrl: '/eordle/icon.png',
	},
	{
		name: 'covid-charts',
		description: 'charts and tables',
		component: CovidCharts,
		iconUrl: '/covid/android-chrome-512x512.png',
	},
	{
		name: 'logical-fitness',
		description: 'fitness levels',
		component: LogicalFitness,
		iconUrl: '/logical-fitness/android-chrome-512x512.png',
	},
	{
		name: 'eric-idle',
		description: 'idle game',
		component: EricIdle,
		iconUrl: '/eric-idle/favicon.ico',
	},
	{
		name: 'jobbies',
		description: 'job app tracker',
		component: Jobbies,
		icon: <FaBlackTie className="size-full" />,
	},
	{
		name: 'weatherman',
		description: 'nice climate map',
		component: Weatherman,
		iconUrl: '/weatherman/favicon.ico',
	},
	{
		name: 'jikan',
		description: 'clocks and timers',
		component: Jikan,
		iconUrl: '/jikan/icon-color.svg',
	},
	{
		name: 'sol',
		description: 'play with solana apis',
		component: Sol,
		icon: <Sun className="size-full text-yellow-500" />,
	},
	{
		name: 'food-map',
		description: 'map of state foods',
		component: FoodMap,
		iconUrl: '/united-states-of-food/favicon.ico',
	},
	{
		name: 'hootch',
		description: 'booze math',
		component: Hootch,
		icon: <Wine className="size-full text-indigo-600" />,
	},
];

interface Props {
	name: string;
	description: string;
	iconUrl?: string;
	icon?: React.ReactNode;
}

const AppItem = ({ name, description, iconUrl, icon }: Props) => {
	return (
		<Link key={name} to={`/${name}`} className='w-full'>
			<div className="flex gap-2 items-center p-2 border border-neutral-700 rounded-lg">
				<div className="size-8 shrink-0">
					{iconUrl && <img src={iconUrl} alt="icon" className="size-full rounded" />}
					{icon && icon}
				</div>
				<div>
					<div>{name}</div>
					<div className='whitespace-nowrap'>{description}</div>
				</div>
			</div>
		</Link>
	);
};

const MainMenu = () => {
	document.title = 'toy apps';
	useFavicon('/eordle/icon.png');

	return (
		<div className="grid min-[480px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 p-2">
			{APPS.map((app) => (
				<AppItem
					key={app.name}
					name={app.name}
					description={app.description}
					iconUrl={app.iconUrl}
					icon={app.icon}
				/>
			))}
		</div>
	);
};

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<MainMenu />} />

			{APPS.map((app) => (
				<Route key={app.name} path={`/${app.name}/*`} element={<app.component />} />
			))}
		</Routes>
	);
};

export function App() {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="flex-grow flex flex-col h-full">
				<AppRoutes />
			</div>
			<div className="p-2">
				<Link to="/" className="flex gap-1">
					<Home /> Home
				</Link>
			</div>
		</div>
	);
}
