import type { Job } from '@/app/types';
import { init } from '@instantdb/react';

const APP_ID = import.meta.env.VITE_APP_ID;

// Optional: Declare your schema for intellisense!
type Schema = {
	jobs: Job;
};

export const db = init<Schema>({ appId: APP_ID });
