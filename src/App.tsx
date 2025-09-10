import { Link, Route, Routes } from 'react-router-dom';
import { CalElDemo } from './cal-el/src/CalElDemo';
import { CovidCharts } from './covid/CovidCharts';
import Eordle from './eordle/Eordle';
import { EricIdle } from './eric-idle/EricIdle';
import { Hootch } from './hootch';
import Jikan from './jikan/Jikan';
import { LogicalFitness } from './logical-fitness/main';
import { UnitedStatesOfFood } from './united-states-of-food';
import { Jobbies } from './jobbies';

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
				logical-fitness - logical increments for fitness
			</Link>
			<Link to={'/eric-idle'}>eric-idle - incomplete idle game</Link>
			<Link to={'/united-states-of-food'}>
				united-states-of-food - signature foods in each state
			</Link>
			<Link to={'/jobbies'}>jobbies - incomplete job app tracker</Link>
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
					<Route path="/eric-idle/*" element={<EricIdle />} />
					<Route path="/united-states-of-food/*" element={<UnitedStatesOfFood />} />
					<Route path="/jobbies/*" element={<Jobbies />} />
				</Routes>
			</div>
			<div>
				<Link to="/">Home</Link>
			</div>
		</div>
	);
}
