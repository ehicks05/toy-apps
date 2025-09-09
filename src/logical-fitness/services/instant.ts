import { init } from '@instantdb/react';
import { schema } from './instant.schema';

const appId = import.meta.env.VITE_INSTANT_APP_ID;

if (!appId) {
	throw new Error('missing app id');
}

export const db = init({ appId, schema });
