import App from './App';
import { ThemeProvider } from './components/ThemeProvider';
import './index.css';
import { useFavicon } from '@/hooks/useFavicon';

export const EricIdle = () => {
	document.title = 'EricIdle';
	useFavicon('/public/eric-idle/favicon.ico');

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<App />
		</ThemeProvider>
	);
};
