export interface Level {
	name: string;
	base: { low: number; high: number };
	stock: number;
	bonus: number;
	retirementMatch: number;
}

export interface Job {
	id: string;
	company: string;
	icon: string;
	iconClass: string;
	location: string;
	recruited: boolean;
	levels: Level[];
}


export interface Stage {
	name: string;
}