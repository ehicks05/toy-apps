import { i, init } from '@instantdb/react';

const APP_ID = import.meta.env.VITE_APP_ID;

const _schema = i.schema({
	entities: {
		jobs: i.entity({
			company: i.string(),
			icon: i.string(),
			invert: i.boolean(),
			location: i.string(),
			recruited: i.boolean(),
			ptoDays: i.number(),
			retirementMatch: i.number(),
			stage: i.string(),
			index: i.number(),
			levels: i.any(),
		}),
		// levels: i.entity({
		// 	name: i.string(),
		// 	baseLow: i.number(),
		// 	baseHigh: i.number(),
		// 	stock: i.number(),
		// 	bonus: i.number(),
		// }),
	},
	// links: {
	// 	jobLevel: {
	// 		forward: { on: 'jobs', has: 'many', label: 'levels' },
	// 		reverse: { on: 'levels', has: 'one', label: 'job' },
	// 	},
	// },
});

type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export const db = init({ appId: APP_ID, schema: schema });

export type { AppSchema };
export default schema;
