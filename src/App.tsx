import { Link, Route, Routes } from 'react-router-dom';
import Eordle from './eordle/Eordle';
import Jikan from './jikan/Jikan';

const MainMenu = () => {
	document.title = 'toy apps';

	return (
		<div className="flex flex-col">
			<Link to={'/jikan'}>jikan - clock, timer, stopwatch</Link>
			<Link to={'/eordle'}>eordle - wordle clone</Link>
		</div>
	);
};

export function App() {
	return (
		<div className="flex flex-col min-h-screen">
			<div>
				<Link to="/">home</Link>
			</div>
			<div className="flex-grow flex flex-col h-full">
				<Routes>
					<Route path="/" element={<MainMenu />} />
					<Route path="/jikan/*" element={<Jikan />} />
					<Route path="/eordle/*" element={<Eordle />} />
				</Routes>
			</div>
		</div>
	);
}
