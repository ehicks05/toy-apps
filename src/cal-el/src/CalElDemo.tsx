import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient, useIsRestoring } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { Button } from './components';
import { Demo } from './components/Calendar/Demo';
import { Footer, Header } from './components/layout';
import { APP_NAME } from './constants/app';
import { useDemoEvents } from './useDemoEvents';
import './index.css';

const queryClient = new QueryClient();

const persister = createAsyncStoragePersister({
	storage: window.localStorage,
	key: `${APP_NAME}-REACT_QUERY_OFFLINE_CACHE`,
});

export function CalElDemo() {
	const { setDemoEvents } = useDemoEvents();

	const isRestoring = useIsRestoring();
	if (isRestoring) return null;

	return (
		<PersistQueryClientProvider client={queryClient} persistOptions={{ persister }} >
			<div className="flex flex-col min-h-screen bg-linear-to-r from-stone-900 to-neutral-950">
				<div className="sm:px-4">
					<Header />
				</div>
				<div className="grow flex flex-col h-full sm:px-4">
					<Button onClick={setDemoEvents}>
						Clear all events and re-create some demo events
					</Button>
					<div className="w-full max-w-screen-2xl mx-auto">
						<div className="flex flex-col gap-4 p-2 md:p-4 mt-7">
							<Demo />
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</PersistQueryClientProvider>
	);
}
