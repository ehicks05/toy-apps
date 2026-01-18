import { Link, Route, Routes } from 'react-router-dom';
import { CalElDemo } from './cal-el/src/CalElDemo';
import { CovidCharts } from './covid/CovidCharts';
import Eordle from './eordle/Eordle';
import { EricIdle } from './eric-idle/EricIdle';
import { Hootch } from './hootch';
import Jikan from './jikan/Jikan';
import { Jobbies } from './jobbies';
import { LogicalFitness } from './logical-fitness/main';
import { Sol } from './sol/App';
import { UnitedStatesOfFood as FoodMap } from './united-states-of-food';
import { Weatherman } from './weatherman';

const APPS = [
	{ name: 'jikan', description: 'clock, timer, stopwatch', component: Jikan },
	{ name: 'eordle', description: 'wordle clone', component: Eordle },
	{ name: 'hootch', description: 'booze math', component: Hootch },
	{ name: 'covid-charts', description: 'charts and tables', component: CovidCharts },
	{ name: 'cal-el', description: 'calendar', component: CalElDemo },
	{
		name: 'logical-fitness',
		description: 'fitness levels',
		component: LogicalFitness,
	},
	{ name: 'eric-idle', description: 'idle game', component: EricIdle },
	{ name: 'food-map', description: 'map of state foods', component: FoodMap },
	{ name: 'jobbies', description: 'job app tracker', component: Jobbies },
	{ name: 'sol', description: 'play with solana apis', component: Sol },
	{ name: 'weatherman', description: 'nice climate map', component: Weatherman },
];

const MainMenu = () => {
	document.title = 'toy apps';

	return (
		<div className="flex flex-col">
			{APPS.map((app) => (
				<Link key={app.name} to={`/${app.name}`}>
					{app.name} - {app.description}
				</Link>
			))}
		</div>
	);
};

export function App() {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="flex-grow flex flex-col h-full">
				<Routes>
					<Route path="/" element={<MainMenu />} />

					{APPS.map((app) => (
						<Route
							key={app.name}
							path={`/${app.name}/*`}
							element={<app.component />}
						/>
					))}
				</Routes>
			</div>
			<div>
				<Link to="/">Home</Link>
			</div>
		</div>
	);
}
