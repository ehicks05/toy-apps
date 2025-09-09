import type { InstaQLResult } from '@instantdb/react';
import { db } from './instant';
import type { AppSchema } from './instant.schema';

export type Workouts = InstaQLResult<
	AppSchema,
	// biome-ignore lint/complexity/noBannedTypes: ok
	{ workouts: { cardios: {}; lifts: {} } }
>;

export type Workout = Workouts['workouts'][number];

export const useWorkouts = () =>
	db.useQuery({ workouts: { cardios: {}, lifts: {} } });
