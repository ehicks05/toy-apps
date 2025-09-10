import './index.css';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { useFavicon } from '@/hooks/useFavicon';
import { APP_NAME } from './constants/app';
import App from './MyApp';

const queryClient = new QueryClient();

const persister = createAsyncStoragePersister({
	storage: window.localStorage,
	key: `${APP_NAME}-REACT_QUERY_OFFLINE_CACHE`,
});

export const Jobbies = () => {
	document.title = 'Jobbies';
	useFavicon('/public/jobbies/favicon-32x32.png');

	return (
		<PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
			<App />
		</PersistQueryClientProvider>
	);
};
