import App from './App';
import './index.css';
import { useFavicon } from '@/hooks/useFavicon';
import { ThemeProvider } from './components/theme-provider';

export const LogicalFitness = () => {
	document.title = 'Logical Fitness';
	useFavicon('/public/logical-fitness/favicon.ico');

	return (
		<ThemeProvider>
			<App />
		</ThemeProvider>
	);
};
