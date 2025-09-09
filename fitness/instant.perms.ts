import type { InstantRules } from '@instantdb/react';

const rules = {
	workouts: {
		allow: {
			view: 'isOwner',
			create: 'auth.id != null',
			update: 'isOwner',
			delete: 'isOwner',
		},
		bind: ['isOwner', "auth.id != null && auth.id in data.ref('owner.id')"],
	},
} satisfies InstantRules;

export default rules;
