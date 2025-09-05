import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { ModalProvider } from 'react-modal-hook';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';

const queryClient = new QueryClient();

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(
	<BrowserRouter>
		<ModalProvider>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</ModalProvider>
	</BrowserRouter>,
);
