import { useIsRestoring } from '@tanstack/react-query';
import { Footer, Header } from './components/layout';
import { JobBoard } from './app/JobBoard';

function MyApp() {
	const isRestoring = useIsRestoring();

	if (isRestoring) return null;

	return (
		<div className="flex flex-col min-h-screen bg-neutral-950">
			<div className="sm:px-4">
				<Header />
			</div>
			<div className="flex-grow flex flex-col h-full sm:px-4">
				<JobBoard />
			</div>
			<Footer />
		</div>
	);
}

export default MyApp;
