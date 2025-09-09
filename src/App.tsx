import { Link, Route, Routes } from 'react-router-dom';
import { CalElDemo } from './cal-el/src/CalElDemo';
import { CovidCharts } from './covid/CovidCharts';
import Eordle from './eordle/Eordle';
import { Hootch } from './hootch';
import Jikan from './jikan/Jikan';
import { LogicalFitness } from './logical-fitness/main';

const MainMenu = () => {
	document.title = 'toy apps';

	return (
		<div className="flex flex-col">
			<Link to={'/jikan'}>jikan - clock, timer, stopwatch</Link>
			<Link to={'/eordle'}>eordle - wordle clone</Link>
			<Link to={'/hootch'}>hootch - booze math</Link>
			<Link to={'/covid'}>covid-charts - charts and tables</Link>
			<Link to={'/cal-el'}>cal-el - calendar</Link>
			<Link to={'/logical-fitness'}>
				logical-fitness - like logical increments but for fitness
			</Link>
		</div>
	);
};

export function App() {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="flex-grow flex flex-col h-full">
				<Routes>
					<Route path="/" element={<MainMenu />} />
					<Route path="/jikan/*" element={<Jikan />} />
					<Route path="/eordle/*" element={<Eordle />} />
					<Route path="/hootch/*" element={<Hootch />} />
					<Route path="/covid/*" element={<CovidCharts />} />
					<Route path="/cal-el/*" element={<CalElDemo />} />
					<Route path="/logical-fitness/*" element={<LogicalFitness />} />
				</Routes>
			</div>
			<div>
				<Link to="/">Home</Link>
			</div>
		</div>
	);
}
