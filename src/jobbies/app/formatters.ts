export const currency = new Intl.NumberFormat('en-US', {
	notation: 'compact',
	compactDisplay: 'short',
	style: 'currency',
	currency: 'usd',
	maximumFractionDigits: 0,
});

export const percent = new Intl.NumberFormat('en-US', {
	style: 'percent',
	maximumFractionDigits: 2,
});
