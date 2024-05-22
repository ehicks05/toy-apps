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
	biggerIsBetter: boolean;
}

const EXERCISES: Exercise[] = [
	{
		label: 'Pushup',
		name: 'pushup',
		unit: '',
		biggerIsBetter: true,
	},
	{
		label: 'Pullup',
		name: 'pullup',
		unit: '',
		biggerIsBetter: true,
	},
	{
		label: 'Bicep Curl',
		name: 'bicepCurl',
		unit: 'lb',
		biggerIsBetter: true,
	},
	{
		label: 'Bench',
		name: 'benchPress',
		unit: 'lb',
		biggerIsBetter: true,
	},
	{
		label: 'Squat',
		name: 'squat',
		unit: 'lb',
		biggerIsBetter: true,
	},
	{
		label: 'Deadlift',
		name: 'deadlift',
		unit: 'lb',
		biggerIsBetter: true,
	},
	{
		label: '100M Dash',
		name: 'oneHundredMeterDash',
		unit: 's',
		biggerIsBetter: false,
	},
	{
		label: '1 Mile Run',
		name: 'oneMileRun',
		unit: 'min',
		biggerIsBetter: false,
	},
];

interface Benchmark {
	tier: string;
	[EXERCISE_NAMES.pushup]: number;
	[EXERCISE_NAMES.pullup]: number;
	[EXERCISE_NAMES.bicepCurl]: number;
	[EXERCISE_NAMES.benchPress]: number;
	[EXERCISE_NAMES.squat]: number;
	[EXERCISE_NAMES.deadlift]: number;
	[EXERCISE_NAMES.oneHundredMeterDash]: number;
	[EXERCISE_NAMES.oneMileRun]: number;
}

const BENCHMARKS: Benchmark[] = [
	{
		tier: 'Plankton',
		pushup: 0,
		pullup: 0,
		bicepCurl: 2,
		benchPress: 5,
		squat: 5,
		deadlift: 5,
		oneHundredMeterDash: 50,
		oneMileRun: 30,
	},
	{
		tier: 'Tadpole',
		pushup: 0,
		pullup: 0,
		bicepCurl: 5,
		benchPress: 10,
		squat: 10,
		deadlift: 10,
		oneHundredMeterDash: 45,
		oneMileRun: 20,
	},
	{
		tier: 'Krill',
		pushup: 1,
		pullup: 0,
		bicepCurl: 6,
		benchPress: 12,
		squat: 12,
		deadlift: 12,
		oneHundredMeterDash: 40,
		oneMileRun: 18,
	},
	{
		tier: 'Anchovy',
		pushup: 1,
		pullup: 1,
		bicepCurl: 8,
		benchPress: 16,
		squat: 16,
		deadlift: 16,
		oneHundredMeterDash: 35,
		oneMileRun: 16,
	},
	{
		tier: 'Goldfish',
		pushup: 3,
		pullup: 1,
		bicepCurl: 16,
		benchPress: 25,
		squat: 25,
		deadlift: 25,
		oneHundredMeterDash: 30,
		oneMileRun: 14,
	},
	{
		tier: 'Jellyfish',
		pushup: 10,
		pullup: 2,
		bicepCurl: 20,
		benchPress: 40,
		squat: 40,
		deadlift: 40,
		oneHundredMeterDash: 25,
		oneMileRun: 12,
	},
	{
		tier: 'Minnow',
		pushup: 12,
		pullup: 3,
		bicepCurl: 25,
		benchPress: 60,
		squat: 60,
		deadlift: 60,
		oneHundredMeterDash: 20,
		oneMileRun: 10,
	},
	{
		tier: 'Lobster',
		pushup: 20,
		pullup: 7,
		bicepCurl: 30,
		benchPress: 80,
		squat: 80,
		deadlift: 80,
		oneHundredMeterDash: 18,
		oneMileRun: 8,
	},
	{
		tier: 'Manta Ray',
		pushup: 25,
		pullup: 10,
		bicepCurl: 40,
		benchPress: 90,
		squat: 90,
		deadlift: 90,
		oneHundredMeterDash: 15,
		oneMileRun: 7,
	},
	{
		tier: 'Dolphin',
		pushup: 30,
		pullup: 15,
		bicepCurl: 50,
		benchPress: 110,
		squat: 110,
		deadlift: 110,
		oneHundredMeterDash: 12,
		oneMileRun: 6,
	},
	{
		tier: 'Swordfish',
		pushup: 40,
		pullup: 20,
		bicepCurl: 60,
		benchPress: 130,
		squat: 130,
		deadlift: 130,
		oneHundredMeterDash: 11,
		oneMileRun: 5.5,
	},
	{
		tier: 'Shark',
		pushup: 50,
		pullup: 25,
		bicepCurl: 130,
		benchPress: 250,
		squat: 250,
		deadlift: 250,
		oneHundredMeterDash: 10,
		oneMileRun: 4.5,
	},
];

const data = {
	columns: [
		{
			label: 'Tier',
			name: 'tier',
			biggerIsBetter: false,
		},
		...EXERCISES,
	],
	rows: [
		{
			tier: 'You',
			pushup: 0,
			pullup: 0,
			bicepCurl: 0,
			benchPress: 0,
			squat: 0,
			deadlift: 0,
			oneHundredMeterDash: 0,
			oneMileRun: 0,
		},
		...BENCHMARKS,
	],
};

const DEFAULT_USER: Record<ExerciseName, number> = {
	pushup: 0,
	pullup: 0,
	bicepCurl: 0,
	benchPress: 0,
	squat: 0,
	deadlift: 0,
	oneHundredMeterDash: 100,
	oneMileRun: 100,
};

export { DEFAULT_USER, data };
