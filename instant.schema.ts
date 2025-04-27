import { i } from '@instantdb/react';

export const schema = i.schema({
	entities: {
		workouts: i.entity({
			date: i.date(),
			location: i.string(),
			notes: i.string(),
		}),
		lifts: i.entity({
			name: i.string(),
			notes: i.string(),
			sets: i.number(),
			reps: i.number(),
			weight: i.number(),
		}),
		cardios: i.entity({
			name: i.string(),
			notes: i.string(),
			speed: i.number(),
			distance: i.number(),
		}),
	},
	links: {
		workoutLifts: {
			forward: { on: 'workouts', has: 'many', label: 'lifts' },
			reverse: { on: 'lifts', has: 'one', label: 'workout' },
		},
		workoutCardio: {
			forward: { on: 'workouts', has: 'many', label: 'cardios' },
			reverse: { on: 'cardios', has: 'one', label: 'workout' },
		},
	},
});
export type AppSchema = typeof schema;
