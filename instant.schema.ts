import { i } from '@instantdb/react';

export const schema = i.schema({
	entities: {
		$users: i.entity({}),
		workouts: i.entity({
			date: i.date().indexed(),
			location: i.string(),
			notes: i.string(),
		}),
		lifts: i.entity({
			name: i.string(),
			notes: i.string(),
			sets: i.number(),
			reps: i.string(), // string is hack to handle different reps per set
			weight: i.string(), // string is hack, same reason as reps
		}),
		cardios: i.entity({
			name: i.string(),
			notes: i.string(),
			speed: i.number(),
			distance: i.number(),
		}),
	},
	links: {
		workoutOwner: {
			forward: { on: 'workouts', has: 'one', label: 'owner' },
			reverse: { on: '$users', has: 'many', label: 'workouts' },
		},
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
