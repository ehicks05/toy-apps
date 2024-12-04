import { Job } from "./types";

export const STAGES = [
	{ name: 'new', label: 'New' },
	{ name: 'in_progress', label: 'In Progress' },
	{ name: 'concluded', label: 'Concluded' },
];

export const JOBS: Job[] = [
	{
		id: '1',
		company: 'Rippling',
		icon: 'https://www.rippling.com/favicons/apple-touch-icon.png',
		iconClass: '',
		location: 'Remote',
		recruited: true,
		levels: [
			{
				name: 'SWE II',
				base: { low: 190000, high: 190000 },
				stock: 102000,
				bonus: 1000,
				retirementMatch: 0,
			},
			{
				name: 'Senior SWE',
				base: { low: 236000, high: 236000 },
				stock: 206000,
				bonus: 8000,
				retirementMatch: 0,
			},
		],
	},
	{
		id: '2',
		company: 'Privy.io',
		icon: 'https://framerusercontent.com/images/1yrQRlTAGFtgW2nERVauOo7PyJM.png',
		iconClass: 'invert',
		location: 'NYC',
		recruited: true,
		levels: [
			{
				name: 'Senior Fullstack',
				base: { low: 150000, high: 220000 },
				stock: 0,
				bonus: 0,
				retirementMatch: 0,
			},
			{
				name: 'Senior Frontend',
				base: { low: 170000, high: 220000 },
				stock: 0,
				bonus: 0,
				retirementMatch: 0,
			},
		],
	},
];