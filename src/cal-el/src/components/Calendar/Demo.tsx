import { Temporal } from 'temporal-polyfill';
import { Calendar } from './Calendar';

export const Demo = () => {
	const date = Temporal.Now.zonedDateTimeISO();

	return <Calendar date={date} />;
};
