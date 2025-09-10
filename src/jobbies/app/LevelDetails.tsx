import { currency } from './formatters';
import type { Job, Level } from './types';

const getTC = ({ job, level }: { job: Job; level: Level }) => {
	const { baseLow, baseHigh, stock, bonus } = level;
	const { retirementMatch } = job;
	const avg = (baseLow + baseHigh) / 2;
	const total = avg + stock + bonus + avg * retirementMatch;
	return total;
};

interface Props {
	job: Job;
	level: Level;
	levels: number;
}

export const LevelDetails = ({ job, level, levels }: Props) => {
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
