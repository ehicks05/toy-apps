import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import type { Temporal } from 'temporal-polyfill';
import { CalendarSettingsMenu } from './SettingsMenu';

interface Props {
	date: Temporal.ZonedDateTime;
	setDate: React.Dispatch<React.SetStateAction<Temporal.ZonedDateTime>>;
	_date: Temporal.ZonedDateTime;
}

export const MonthMenu = ({ date, setDate, _date }: Props) => {
	const handleReset = () => setDate(_date);
	const handlePrev = () => setDate(date.subtract({ months: 1 }));
	const handleNext = () => setDate(date.add({ months: 1 }));

	return (
		<div className="flex gap-2 w-32 justify-end text-neutral-300">
			<CalendarSettingsMenu />

			<button type="button" onClick={handleReset}>
				<Calendar size={20} />
			</button>
			<button type="button" onClick={handlePrev}>
				<ArrowLeft size={20} />
			</button>
			<button type="button" onClick={handleNext}>
				<ArrowRight size={20} />
			</button>
		</div>
	);
};
