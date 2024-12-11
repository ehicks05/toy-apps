export interface Level {
	name: string;
	base: { low: number; high: number };
	stock: number;
	bonus: number;
	retirementMatch: number;
	ptoDays: number;
}

export interface Job {
	id: string;
	company: string;
	icon: string;
	invert: boolean;
	location: string;
	recruited: boolean;
	levels: Level[];
	stage: string;
	index: number;
}

export interface Stage {
	name: string;
	label: string;
}
