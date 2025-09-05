import { useFavicon } from '@/hooks/useFavicon';
import App from './App';
import './app.css';

function Eordle() {
	document.title = 'eordle';
	useFavicon('/eordle/icon.png');

	return <App />;
}

export default Eordle;
