import type { Job } from '@/jobbies/app/types';
import { useLocalStorage } from 'usehooks-ts';
import { JOBS } from './sample_data';

export const useJobs = () => {
	const [data, setJobs] = useLocalStorage('jobs', JOBS);
	const jobs = data.toSorted((o1, o2) => o1.index - o2.index) || [];

	return {
		// read
		jobs,
		findById: (id: string) => jobs.find((o) => o.id === id),

		// write
		updateJob: (id: string, patch: Partial<Job>) =>
			setJobs(jobs.map((job) => (job.id === id ? { ...job, ...patch } : job))),
		updateJobs: (jobs: Job[]) => setJobs(jobs),

		// specialized
		resetJobs: () => setJobs(JOBS),
		exportJobs: () => navigator.clipboard.writeText(JSON.stringify(jobs)),
	};
};
