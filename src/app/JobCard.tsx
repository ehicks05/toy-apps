import { MapPin, PersonStanding } from 'lucide-react';
import { CompensationDetails } from './CompensationDetails';
import { currency } from './formatters';
import type { Job, Level } from './types';

const getTC = ({ job, level }: { job: Job; level: Level }) => {
	const {
		base: { low, high },
		stock,
		bonus,
	} = level;
	const { retirementMatch } = job;
	const avg = (low + high) / 2;
	const total = avg + stock + bonus + avg * retirementMatch;
	return total;
};

const LevelChip = ({ job, level }: { job: Job; level: Level }) => {
	const { name } = level;
	const total = getTC({ job, level });

	return (
		<div className="flex flex-col gap-2 p-2 w-48 rounded bg-neutral-800">
			<div className="text-lg text-neutral-300">{name}</div>
			<div className="flex gap-1 items-center justify-end">
				{currency.format(total)}
				<span className="w-8 text-neutral-400">tot</span>
			</div>

			{/* <CompensationDetails level={level} /> */}
		</div>
	);
};

const Levels = ({ levels, job }: { levels: Level[]; job: Job }) => {
	return (
		<div className="flex gap-2">
			{levels.map((level) => (
				<LevelChip key={level.name} level={level} job={job} />
			))}
		</div>
	);
};

const LevelInfo = ({
	job,
	level,
	levels,
}: { job: Job; level: Level; levels: number }) => {
	const { name } = level;
	const total = getTC({ job, level });

	return (
		<div
			className={`flex gap-2 items-center ${levels > 1 ? 'text-sm p-1' : 'p-2'} ${
				total > 300_000
					? 'text-green-400'
					: total > 250_000
						? 'text-lime-400'
						: total > 200_000
							? 'text-yellow-400'
							: total > 150_000
								? 'text-orange-400'
								: 'text-red-400'
			}`}
		>
			<div>{currency.format(total)}</div>
			<div className="line-clamp-1">{name}</div>
		</div>
	);
};

export const JobCard = ({ job }: { job: Job }) => {
	const { company, icon, invert, location, recruited, ptoDays } = job;

	return (
		<>
			<td className="p-2 w-32 bg-neutral-900">
				<div className="flex items-center gap-1">
					<img
						className={`w-5 h-5 ${invert ? 'invert' : ''}`}
						src={icon}
						alt="icon"
					/>
					<div>{company}</div>
				</div>
			</td>

			<td className="p-2 w-[1%] bg-neutral-900">
				{recruited && (
					<PersonStanding size={24} className={'text-green-400 shrink-0'} />
				)}
			</td>

			<td
				className={`p-2 w-[1%] bg-neutral-900 ${
					location === 'remote'
						? 'text-green-400'
						: ['nyc', 'philly'].includes(location)
							? 'text-lime-400'
							: 'text-yellow-400'
				}`}
			>
				<div className="flex gap-0.5 items-center">
					{location}
					<MapPin size={16} />
				</div>
			</td>

			<td
				className={`p-2 text-right w-[1%] whitespace-nowrap bg-neutral-900 ${
					ptoDays >= 60
						? 'text-green-400'
						: ptoDays >= 30
							? 'text-lime-400'
							: 'text-red-400'
				}`}
			>
				{ptoDays} days
			</td>

			<td className="w-64 p-0">
				{job.levels.map((level) => (
					<LevelInfo
						key={level.name}
						job={job}
						level={level}
						levels={job.levels.length}
					/>
				))}
			</td>
			<td className="w-2/12">typescript, react</td>
			<td className="w-1/12" />
		</>
	);
};
