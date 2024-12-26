import type { Job } from '@/app/types';
import { id, tx } from '@instantdb/react';
import { JOBS } from '../../data';
import { db } from '../lib/db';

function addJob(job: Job) {
	db.transact(
		tx.jobs[id()].update({
			...job,
		}),
	);
}

function updateJob(id: string, data: Partial<Job>) {
	db.transact([tx.jobs[id].merge({ ...data })]);
}

function updateJobs(jobs: Job[]) {
	db.transact(jobs.map((j) => tx.jobs[j.id].update({ ...j })));
}

function deleteJob(job: Job) {
	db.transact([tx.jobs[job.id].delete()]);
}

function resetJobs(jobs: Job[]) {
	db.transact(jobs.map((j) => tx.jobs[j.id].delete()));
	JOBS.map((job) => addJob(job));
}

function exportJobs(jobs: Job[]) {
	navigator.clipboard.writeText(JSON.stringify(jobs));
}

export const useJobs = () => {
	// const query = { jobs: { $: { order: { index: 'asc' } } } };
	const query = { jobs: {} };
	const { isLoading, error, data } = db.useQuery(query);
	const jobs = data?.jobs.toSorted((o1, o2) => o1.index - o2.index) || [];

	return {
		// read
		jobs,
		isLoading,
		error,
		findById: (id: string) => jobs.find((o) => o.id === id),

		// write
		addJob,
		deleteJob,
		updateJob,
		updateJobs,

		// specialized
		resetJobs: () => resetJobs(jobs),
		exportJobs: () => exportJobs(jobs),
	};
};
