import { useFavicon } from '@/hooks/useFavicon';
import App from './App';
import './index.css';
import 'leaflet/dist/leaflet.css'

export const Weatherman = () => {
	document.title = 'Weatherman';
	useFavicon('/public/weatherman/favicon.ico');

	return <App />;
};
