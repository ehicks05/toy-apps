//ts-worksheet-with-variables
import { Temporal } from 'temporal-polyfill';

Temporal.Now.plainDateISO();
Temporal.Now.plainTimeISO();
Temporal.Now.plainDateTimeISO();

console.log(Temporal.Now.plainDateTimeISO().toLocaleString('en-US'));

Temporal.PlainDate.from('2024-11-04').add(Temporal.Duration.from('P1D'));

Temporal.Now.zonedDateTimeISO().withTimeZone('America/Los_Angeles');

Temporal.PlainDate.from({ year: 2024, month: 10, day: 31 }).add({ months: 1 });

Temporal.PlainYearMonth.from({ year: 2024, month: 11 });

Temporal.ZonedDateTime.from('2024-11-04[America/New_York]');

Temporal.Now.zonedDateTimeISO().round({
	smallestUnit: 'minute',
	roundingIncrement: 15,
});

const monthLabel = Temporal.ZonedDateTime.from(
	'2024-11-04[America/New_York]',
).toLocaleString('en-US', {
	month: 'long',
	year: 'numeric',
});

Temporal.Now.zonedDateTimeISO().with({ year: 1999 });

Temporal.Now.plainDateISO().toString();
