import { BENCHMARKS, type Benchmark, EXERCISES } from './data';
import { useUser } from './useUser';

function Header() {
	return (
		<thead>
			<tr className="border-b-2">
				<th className="px-2 py-1 text-left">Tier</th>
				{EXERCISES.map((exercise) => (
					<th key={exercise.name} className="px-2 py-1 text-right">
						{exercise.label}
					</th>
				))}
			</tr>
		</thead>
	);
}

function Rows({ user }: { user: Benchmark }) {
	return BENCHMARKS.map((benchmark) => {
		const cells = EXERCISES.map((exercise) => {
			const value = benchmark[exercise.name];

			const isPassing = exercise.isAscending
				? user[exercise.name] >= value
				: user[exercise.name] <= value;
			return (
				<td
					key={`${benchmark.name} ${exercise.name}`}
					className={`px-2 py-1 text-right ${
						isPassing ? 'text-gray-50 bg-green-500 dark:bg-green-700' : ''
					}`}
				>
					{`${value} ${exercise.unit}`}
				</td>
			);
		});

		return (
			<tr className="border-b" key={benchmark.name}>
				<th className="px-2 py-1 text-left">{benchmark.name}</th>
				{cells}
			</tr>
		);
	});
}

const UserRow = ({
	user,
	setUser,
}: {
	user: Benchmark;
	setUser: React.Dispatch<React.SetStateAction<Benchmark>>;
}) => {
	return (
		<tr className="border-b">
			<th className="px-2 py-1 text-left">You</th>
			{EXERCISES.map(({ name, unit }) => {
				return (
					<td className={'text-right'} key={name}>
						<span className="flex px-2 py-1">
							<input
								className={
									'pr-1 w-full text-right bg-gray-100 dark:text-gray-50 dark:bg-gray-900'
								}
								type="number"
								inputMode={'numeric'}
								value={user[name]}
								onChange={(e) => {
									setUser({
										...user,
										[name]: Number(e.target.value),
									});
								}}
							/>{' '}
							{unit}
						</span>
					</td>
				);
			})}
		</tr>
	);
};

function Table() {
	const [user, setUser] = useUser();

	return (
		<div className="overflow-auto">
			<table className="w-full">
				<Header />
				<tbody>
					<Rows user={user} />
					<UserRow user={user} setUser={setUser} />
				</tbody>
			</table>
		</div>
	);
}

export default Table;
