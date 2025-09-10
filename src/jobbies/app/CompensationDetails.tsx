import { currency, percent } from './formatters';
import type { Level } from './types';

export const CompensationDetails = ({ level }: { level: Level }) => {
	const {
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
		<>
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
		</>
	);
};
