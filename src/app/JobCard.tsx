import { Check, MapPin, X } from 'lucide-react';
import { CompensationDetails } from './CompensationDetails';
import { currency } from './formatters';
import type { Job, Level } from './types';

const LevelChip = ({ level }: { level: Level }) => {
	const {
		name,
		base: { low, high },
		stock,
		bonus,
		retirementMatch,
	} = level;

	const avg = (low + high) / 2;
	const total = avg + stock + bonus + avg * retirementMatch;

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

const Levels = ({ levels }: { levels: Level[] }) => {
	return (
		<div className="flex gap-2">
			{levels.map((level) => (
				<LevelChip key={level.name} level={level} />
			))}
		</div>
	);
};

export const JobCard = ({ job }: { job: Job }) => {
	const { company, icon, invert, location, recruited, levels } = job;

	return (
		<div className="p-2 rounded bg-neutral-900">
			<div className="flex flex-col gap-4">
				<div className="flex justify-between items-start gap-2">
					<div className="flex gap-2">
						<div className="flex items-center">
							<img
								className={`w-10 h-10 ${invert ? 'invert' : ''}`}
								src={icon}
								alt="icon"
							/>
						</div>
						<div className="flex flex-col">
							<div>{company}</div>
							<div className="flex gap-1 items-center">
								{location}
								<MapPin
									size={16}
									className={
										location === 'remote' ? 'text-green-400' : 'text-neutral-400'
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
				</div>
				<Levels levels={levels} />
			</div>
		</div>
	);
};
