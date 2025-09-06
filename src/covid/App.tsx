import { ReactNode, useMemo } from 'react';
import { useLocalStorage } from 'usehooks-ts'; // esm
import Chart from './Chart';
import CountySelector from './CountySelector';
import { JHU_REPO } from './constants';
import Table from './Table';
import { useFetchData } from './useFetchData';
import { processData } from './utils';

const Banner = () => (
	<div className="w-full p-2 text-center bg-neutral-700 text-neutral-200">
		On March 10, 2023, the Johns Hopkins Coronavirus Resource Center ceased its
		collecting and reporting of global COVID-19 data. For more info, see{' '}
		<a className="underline" href={JHU_REPO}>
			here
		</a>
		.
	</div>
);

const Shell = ({children}: {children: ReactNode}) => {
		return (
		<div className="flex flex-col min-h-screen w-full">
			<Banner />

			{children}

			<div className="flex-grow" />
			<footer className="p-1">
				<a className="text-blue-500 hover:underline" href={JHU_REPO}>
					JHU CSSE COVID-19 Data
				</a>
			</footer>
		</div>
	);
}

const Content = () => {
		const { isLoading, isError, data: rawData } = useFetchData();

	const [UIDs] = useLocalStorage('UIDs', ['84034019'], {
		initializeWithValue: true,
	});

	const data = useMemo(() => {
		return rawData && UIDs ? processData(rawData, UIDs) : [];
	}, [rawData, UIDs]);

		if (isError) return <div>Error...</div>;
		if (isLoading) return <div>Loading...</div>;
		if (!rawData) return <div>No data...</div>;

			return Object.keys(rawData?.counties || {})?.includes('84034019') &&
				Object.entries(data).length !== 0 && (
					<div className="max-w-screen-xl w-full m-auto flex flex-col gap-4 p-4">
						<CountySelector counties={rawData.counties} />
						<Chart data={data} counties={rawData.counties} UIDs={UIDs} />
						<Table data={data} counties={rawData.counties} UIDs={UIDs} />
					</div>
				)
}

function App() {
	return (
		<Shell>

<Content />
		</Shell>
	);
}

export default App;
