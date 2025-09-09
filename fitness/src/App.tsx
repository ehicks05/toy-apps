import Table from './Table';
import { Workouts } from './Workouts';
import { LoginDialog } from './components/Auth';
import { ThemeToggle } from './theme/ThemeToggle';

function App() {
	return (
		<div className="min-h-screen font-sans text-gray-700 dark:text-gray-50 bg-gray-50 dark:bg-gray-800">
			<div className="flex flex-col container mx-auto p-4 md:p-6">
				<section className="flex justify-end w-full">
					<LoginDialog />
					<ThemeToggle />
				</section>
				<section className="p-12">
					<div className="text-center space-y-1">
						<div className="font-bold text-3xl">Logical Fitness</div>
						<div className="text-xl">A Guide to Balanced Fitness</div>
					</div>
				</section>

				<section>
					<Table />
					<Workouts />
				</section>

				<footer className="p-12 pt-20">
					<div className="text-center">
						<strong>Logical Fitness</strong> by{' '}
						<a href="https://ehicks.net">Eric Hicks</a>
					</div>
				</footer>
			</div>
		</div>
	);
}

export default App;
