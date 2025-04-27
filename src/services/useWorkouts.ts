import type { InstaQLResult } from '@instantdb/react';
import type { AppSchema } from '../../instant.schema';
import { db } from './instant';

export type Workouts = InstaQLResult<
	AppSchema,
	{ workouts: { cardios: {}; lifts: {} } }
>;

export type Workout = Workouts['workouts'][number];

export const useWorkouts = () =>
	db.useQuery({ workouts: { cardios: {}, lifts: {} } });
