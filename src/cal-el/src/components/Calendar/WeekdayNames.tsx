import { useSettings } from '../../hooks';
import { getWeekdayNames } from './utils/weekdayNames';

export const WeekdayNames = () => {
	const { isShowWeekend } = useSettings();
	const weekdayNames = getWeekdayNames().slice(
		isShowWeekend ? 0 : 1,
		isShowWeekend ? 7 : -1,
	);

	return weekdayNames.map((weekdayName) => (
		<div key={weekdayName} className="p-2 border border-neutral-800 bg-neutral-800">
			{weekdayName}
		</div>
	));
};
