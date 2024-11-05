import { useIsRestoring } from '@tanstack/react-query';
import { Demo } from './components/Calendar/Demo';
import { Footer, Header } from './components/layout';

function MyApp() {
	const isRestoring = useIsRestoring();

	if (isRestoring) return null;

	return (
		<div className="flex flex-col min-h-screen bg-gradient-to-r from-stone-900 to-neutral-950">
			<div className="sm:px-4">
				<Header />
			</div>
			<div className="flex-grow flex flex-col h-full sm:px-4">
				<div className="w-full max-w-screen-2xl mx-auto">
					<div className="flex flex-col gap-4 p-2 md:p-4 mt-7">
						<Demo />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default MyApp;
