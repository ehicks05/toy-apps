import App from './App';
import './index.css';
import { useFavicon } from '@/hooks/useFavicon';

export const LogicalFitness = () => {
	document.title = 'Logical Fitness';
	useFavicon('/public/logical-fitness/favicon.ico');

	return <App />;
};
