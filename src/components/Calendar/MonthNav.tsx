import { MdArrowBack, MdArrowForward, MdToday } from 'react-icons/md';
import { addMonths } from './dates';

interface MonthNavProps {
	date: Date;
	setDate: React.Dispatch<React.SetStateAction<Date>>;
	_date: Date;
}

export const MonthNav = ({ date, setDate, _date }: MonthNavProps) => {
	const handleReset = () => setDate(_date);
	const handlePrev = () => setDate(addMonths(date, -1));
	const handleNext = () => setDate(addMonths(date, 1));

	return (
		<div className="flex gap-2 w-20 justify-end">
			<button type="button" onClick={handleReset}>
				<MdToday size={20} />
			</button>
			<button type="button" onClick={handlePrev}>
				<MdArrowBack size={20} />
			</button>
			<button type="button" onClick={handleNext}>
				<MdArrowForward size={20} />
			</button>
		</div>
	);
};
