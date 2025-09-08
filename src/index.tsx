import './index.css';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createRoot } from 'react-dom/client';
import { APP_NAME } from './constants/app';
import { AppProvider } from './contexts/AppProvider';
import App from './MyApp';

const queryClient = new QueryClient();

const persister = createAsyncStoragePersister({
	storage: window.localStorage,
	key: `${APP_NAME}-REACT_QUERY_OFFLINE_CACHE`,
});

const container = document.getElementById('root');
const root = createRoot(container as Element);
root.render(
	<PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
		<AppProvider>
			<App />
		</AppProvider>
	</PersistQueryClientProvider>,
);
