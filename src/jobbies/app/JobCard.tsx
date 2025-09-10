import { MapPin, PersonStanding } from 'lucide-react';
import { LevelDetails } from './LevelDetails';
import type { Job } from './types';

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
						: ptoDays >= 50
							? 'text-lime-400'
							: ptoDays >= 40
								? 'text-yellow-400'
								: ptoDays >= 30
									? 'text-orange-400'
									: 'text-red-400'
				}`}
			>
				{ptoDays} days
			</td>

			<td className="w-64 p-0">
				{job.levels.map((level) => (
					<LevelDetails
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
