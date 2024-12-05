import { JOBS } from '@/app/data';
import { APP_NAME } from '@/constants/app';
import { useLocalStorage } from '@uidotdev/usehooks';

export const useJobs = () => {
	const [jobs, setJobs] = useLocalStorage(`${APP_NAME}-jobs`, JOBS);

	const removeById = (id: string) => setJobs(jobs.filter((o) => o.id !== id));
	const findById = (id: string) => jobs.find((o) => o.id === id);
	const updateById = (id: string, stage: string) =>
		setJobs(jobs.map((o) => (o.id === id ? { ...o, stage } : o)));

	return {
		jobs,
		setJobs,
		removeById,
		findById,
		updateById,
	};
};
