import { Link, Route, Routes } from 'react-router-dom';
import { CovidCharts } from './covid/CovidCharts';
import Eordle from './eordle/Eordle';
import { Hootch } from './hootch';
import Jikan from './jikan/Jikan';
import { CalElDemo } from './cal-el/src/CalElDemo';

const MainMenu = () => {
	document.title = 'toy apps';

	return (
		<div className="flex flex-col">
			<Link to={'/jikan'}>jikan - clock, timer, stopwatch</Link>
			<Link to={'/eordle'}>eordle - wordle clone</Link>
			<Link to={'/hootch'}>hootch - booze math</Link>
			<Link to={'/covid'}>covid-charts - charts and tables</Link>
			<Link to={'/cal-el'}>cal-el - calendar</Link>
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
					<Route path="/hootch/*" element={<Hootch />} />
					<Route path="/covid/*" element={<CovidCharts />} />
					<Route path="/cal-el/*" element={<CalElDemo />} />
				</Routes>
			</div>
		</div>
	);
}
