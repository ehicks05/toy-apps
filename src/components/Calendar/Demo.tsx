import { Calendar, Manager } from './Calendar';
import { CalendarSettingsMenu } from './SettingsMenu';
import { EVENTS } from './data';

export const Demo = () => {
	const date = new Date();

	return (
		<div className="flex flex-col gap-4">
			<div>
				<CalendarSettingsMenu />
			</div>
			<Manager date={date} events={EVENTS} />
		</div>
	);
};
