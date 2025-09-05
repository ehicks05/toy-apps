import { Link, Route, Routes } from 'react-router-dom';
// import Eordle from './eordle/MyApp';
import Jikan from './jikan/Jikan';

const MainMenu = () => {
	document.title = 'hi';
	return (
		<div>
			<Link to={'/jikan'}>jikan - clock, timer, stopwatch</Link>
		</div>
	);
};

export function App() {
	return (
		<div className="flex flex-col min-h-screen bg-gradient-to-r from-sky-950 to-blue-950">
			<div>
				<Link to="/">home</Link>
			</div>
			<div className="flex-grow flex flex-col h-full sm:px-4">
				<Routes>
					<Route path="/" element={<MainMenu />} />
					<Route path="/jikan/*" element={<Jikan />} />
					{/* <Route path="/eordle/*" element={<Eordle />} /> */}
				</Routes>
			</div>
			<div>footer: hi</div>
		</div>
	);
}
