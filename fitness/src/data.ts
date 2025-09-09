const EXERCISE_NAMES = {
	pushup: 'pushup',
	pullup: 'pullup',
	bicepCurl: 'bicepCurl',
	benchPress: 'benchPress',
	squat: 'squat',
	deadlift: 'deadlift',
	oneHundredMeterDash: 'oneHundredMeterDash',
	oneMileRun: 'oneMileRun',
} as const;

type ExerciseName = keyof typeof EXERCISE_NAMES;

interface Exercise {
	name: ExerciseName;
	label: string;
	unit: string;
	isAscending: boolean;
}

export const EXERCISES: Exercise[] = [
	{
		label: 'Pushup',
		name: 'pushup',
		unit: '',
		isAscending: true,
	},
	{
		label: 'Pullup',
		name: 'pullup',
		unit: '',
		isAscending: true,
	},
	{
		label: 'Bicep Curl',
		name: 'bicepCurl',
		unit: 'lb',
		isAscending: true,
	},
	{
		label: 'Bench',
		name: 'benchPress',
		unit: 'lb',
		isAscending: true,
	},
	{
		label: 'Squat',
		name: 'squat',
		unit: 'lb',
		isAscending: true,
	},
	{
		label: 'Deadlift',
		name: 'deadlift',
		unit: 'lb',
		isAscending: true,
	},
	{
		label: '100M Dash',
		name: 'oneHundredMeterDash',
		unit: 's',
		isAscending: false,
	},
	{
		label: '1 Mile Run',
		name: 'oneMileRun',
		unit: 'min',
		isAscending: false,
	},
];

export interface Benchmark {
	name: string;
	[EXERCISE_NAMES.pushup]: number;
	[EXERCISE_NAMES.pullup]: number;
	[EXERCISE_NAMES.bicepCurl]: number;
	[EXERCISE_NAMES.benchPress]: number;
	[EXERCISE_NAMES.squat]: number;
	[EXERCISE_NAMES.deadlift]: number;
	[EXERCISE_NAMES.oneHundredMeterDash]: number;
	[EXERCISE_NAMES.oneMileRun]: number;
}

export const BENCHMARKS: Benchmark[] = [
	{
		name: 'Shark',
		pushup: 50,
		pullup: 25,
		bicepCurl: 100,
		benchPress: 250,
		squat: 350,
		deadlift: 425,
		oneHundredMeterDash: 11,
		oneMileRun: 5,
	},
	{
		name: 'Swordfish',
		pushup: 40,
		pullup: 20,
		bicepCurl: 60,
		benchPress: 200,
		squat: 280,
		deadlift: 340,
		oneHundredMeterDash: 11.5,
		oneMileRun: 5.5,
	},
	{
		name: 'Dolphin',
		pushup: 30,
		pullup: 15,
		bicepCurl: 50,
		benchPress: 180,
		squat: 252,
		deadlift: 306,
		oneHundredMeterDash: 12,
		oneMileRun: 6,
	},
	{
		name: 'Manta Ray',
		pushup: 25,
		pullup: 10,
		bicepCurl: 40,
		benchPress: 160,
		squat: 224,
		deadlift: 272,
		oneHundredMeterDash: 12.5,
		oneMileRun: 6.5,
	},
	{
		name: 'Lobster',
		pushup: 20,
		pullup: 8,
		bicepCurl: 30,
		benchPress: 140,
		squat: 196,
		deadlift: 238,
		oneHundredMeterDash: 13,
		oneMileRun: 7,
	},
	{
		name: 'Minnow',
		pushup: 15,
		pullup: 7,
		bicepCurl: 25,
		benchPress: 120,
		squat: 168,
		deadlift: 204,
		oneHundredMeterDash: 13.5,
		oneMileRun: 7.5,
	},
	{
		name: 'Jellyfish',
		pushup: 12,
		pullup: 6,
		bicepCurl: 20,
		benchPress: 100,
		squat: 140,
		deadlift: 170,
		oneHundredMeterDash: 14,
		oneMileRun: 8,
	},
	{
		name: 'Goldfish',
		pushup: 10,
		pullup: 5,
		bicepCurl: 16,
		benchPress: 80,
		squat: 112,
		deadlift: 136,
		oneHundredMeterDash: 14.5,
		oneMileRun: 8.5,
	},
	{
		name: 'Anchovy',
		pushup: 8,
		pullup: 4,
		bicepCurl: 10,
		benchPress: 60,
		squat: 92,
		deadlift: 116,
		oneHundredMeterDash: 15,
		oneMileRun: 9,
	},
	{
		name: 'Krill',
		pushup: 6,
		pullup: 3,
		bicepCurl: 8,
		benchPress: 40,
		squat: 56,
		deadlift: 68,
		oneHundredMeterDash: 16,
		oneMileRun: 10,
	},
	{
		name: 'Tadpole',
		pushup: 4,
		pullup: 2,
		bicepCurl: 6,
		benchPress: 20,
		squat: 28,
		deadlift: 34,
		oneHundredMeterDash: 18,
		oneMileRun: 12,
	},
	{
		name: 'Plankton',
		pushup: 2,
		pullup: 1,
		bicepCurl: 4,
		benchPress: 10,
		squat: 14,
		deadlift: 17,
		oneHundredMeterDash: 20,
		oneMileRun: 15,
	},
];

export const DEFAULT_USER: Record<ExerciseName, number> = {
	pushup: 0,
	pullup: 0,
	bicepCurl: 0,
	benchPress: 0,
	squat: 0,
	deadlift: 0,
	oneHundredMeterDash: 30,
	oneMileRun: 20,
};
