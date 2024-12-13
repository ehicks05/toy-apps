export interface Level {
	name: string;
	base: { low: number; high: number };
	stock: number;
	bonus: number;
}

export interface Job {
	id: string;
	company: string;
	icon: string;
	invert: boolean;
	location: string;
	recruited: boolean;
	levels: Level[];
	ptoDays: number;
	retirementMatch: number;
	stage: string;
	index: number;
}

export interface Stage {
	name: string;
	label: string;
}
