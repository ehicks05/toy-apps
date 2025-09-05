import { Link, Route, Routes } from 'react-router-dom';
import MyApp from './jikan/MyApp';

export function App() {
	return (
		<div className="flex flex-col min-h-screen bg-gradient-to-r from-sky-950 to-blue-950">
			<div><Link to="/">home</Link></div>
			<div className="flex-grow flex flex-col h-full sm:px-4">
				<Routes>
					<Route
						path="/"
						element={
							<div>
								<Link to={'/jikan'}>jikan</Link>
							</div>
						}
					/>
					<Route path="/jikan/*" element={<MyApp />} />
				</Routes>
			</div>
			<div>footer: hi</div>
		</div>
	);
}
