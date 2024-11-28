import { useIsRestoring } from '@tanstack/react-query';
import { Check, MapPin, X } from 'lucide-react';
import { Footer, Header } from './components/layout';

const currency = new Intl.NumberFormat('en-US', {
	notation: 'compact',
	compactDisplay: 'short',
	style: 'currency',
	currency: 'usd',
	maximumFractionDigits: 0,
});

const percent = new Intl.NumberFormat('en-US', {
	style: 'percent',
	maximumFractionDigits: 2,
});

interface Level {
	name: string;
	base: { low: number; high: number };
	stock: number;
	bonus: number;
	retirementMatch: number;
}

interface Job {
	id: string;
	company: string;
	icon: string;
	iconClass: string;
	location: string;
	recruited: boolean;
	levels: Level[];
}

const JOBS: Job[] = [
	{
		id: '1',
		company: 'Rippling',
		icon: 'https://www.rippling.com/favicons/apple-touch-icon.png',
		iconClass: '',
		location: 'Remote',
		recruited: true,
		levels: [
			{
				name: 'SWE II',
				base: { low: 190000, high: 190000 },
				stock: 102000,
				bonus: 1000,
				retirementMatch: 0,
			},
			{
				name: 'Senior SWE',
				base: { low: 236000, high: 236000 },
				stock: 206000,
				bonus: 8000,
				retirementMatch: 0,
			},
		],
	},
	{
		id: '2',
		company: 'Privy.io',
		icon: 'https://framerusercontent.com/images/1yrQRlTAGFtgW2nERVauOo7PyJM.png',
		iconClass: 'invert',
		location: 'NYC',
		recruited: true,
		levels: [
			{
				name: 'Senior Fullstack',
				base: { low: 150000, high: 220000 },
				stock: 0,
				bonus: 0,
				retirementMatch: 0,
			},
			{
				name: 'Senior Frontend',
				base: { low: 170000, high: 220000 },
				stock: 0,
				bonus: 0,
				retirementMatch: 0,
			},
		],
	},
];

interface Stage {
	name: string;
}

const STAGES = [{ name: 'new' }];

const LevelChip = ({ level }: { level: Level }) => {
	const {
		name,
		base: { low, high },
		stock,
		bonus,
		retirementMatch,
	} = level;

	const base =
		low === high
			? currency.format(low)
			: `${currency.format(low)} - ${currency.format(high)}`;

	return (
		<div className="flex flex-col gap-2 p-4 rounded bg-neutral-800">
			<div className="text-lg text-neutral-300">{name}</div>
			<div className="flex gap-1 items-center justify-end">
				{base}
				<span className="w-8 text-neutral-400">sal</span>
			</div>
			<div className="flex gap-1 items-center justify-end">
				{currency.format(stock)}
				<span className="w-8 text-neutral-400">sto</span>
			</div>
			<div className="flex gap-1 items-center justify-end">
				{currency.format(bonus)}
				<span className="w-8 text-neutral-400">bon</span>
			</div>
			<div className="flex gap-1 items-center justify-end">
				{percent.format(retirementMatch)}
				<span className="w-8 text-neutral-400">mat</span>
			</div>
		</div>
	);
};

const Levels = ({ levels }: { levels: Level[] }) => {
	return (
		<div className="flex gap-4">
			{levels.map((level) => (
				<LevelChip key={level.name} level={level} />
			))}
		</div>
	);
};

const JobCard = ({ job }: { job: Job }) => {
	const { company, icon, iconClass, location, recruited, levels } = job;

	return (
		<div className="p-4 rounded bg-neutral-900">
			<div className="flex flex-col gap-4">
				<div className="flex gap-2">
					<div className="flex items-center">
						<img className={`w-10 h-10 ${iconClass}`} src={icon} alt="icon" />
					</div>
					<div className="flex flex-col">
						<div>{company}</div>
						<div className="flex gap-1 items-center">
							{location}
							<MapPin
								size={16}
								className={
									location === 'Remote' ? 'text-green-400' : 'text-neutral-400'
								}
							/>
						</div>
					</div>
				</div>
				<div className="flex gap-1 items-center">
					Recruited
					{recruited ? (
						<Check size={16} className={'text-green-400'} />
					) : (
						<X size={16} className={'text-neutral-400'} />
					)}
				</div>
				<Levels levels={levels} />
			</div>
		</div>
	);
};

function MyApp() {
	const isRestoring = useIsRestoring();

	if (isRestoring) return null;

	return (
		<div className="flex flex-col min-h-screen bg-gradient-to-r from-stone-900 to-neutral-950">
			<div className="sm:px-4">
				<Header />
			</div>
			<div className="flex-grow flex flex-col h-full sm:px-4">
				<div className="w-full max-w-screen-2xl mx-auto">
					<div className="flex flex-col gap-4 p-2 md:p-4 mt-7">
						{JOBS.map((job) => (
							<JobCard key={job.id} job={job} />
						))}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default MyApp;
