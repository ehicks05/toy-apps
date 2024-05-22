import { data } from './data';
import { useUser } from './useUser';

function HeaderRow() {
	return data.columns.map((column) => {
		return (
			<th
				key={column.name}
				className={`px-2 py-1 ${
					column.name === 'tier' ? 'text-left' : 'text-right'
				}`}
			>
				{column.label}
			</th>
		);
	});
}

function Rows() {
	const [user, setUser] = useUser();

	return [...data.rows].reverse().map((dataRow) => {
		const cells = data.columns.map((column) => {
			const key = `${dataRow.tier} ${column.name}`;

			if (dataRow.tier === 'You') {
				if (column.name === 'tier') {
					return (
						<th className="px-2 py-1 text-left" key={key}>
							{dataRow.tier}
						</th>
					);
				}

				return (
					<td className={'px-2 py-1 text-right'} key={key}>
						<input
							className={
								'w-full text-right bg-gray-100 dark:text-gray-50 dark:bg-gray-900'
							}
							type="number"
							inputMode={'numeric'}
							value={user[column.name]}
							onChange={(e) => {
								setUser({
									...user,
									[column.name]: Number(e.target.value),
								});
							}}
						/>
					</td>
				);
			}

			const value = dataRow[column.name];

			if (column.name === 'tier') {
				return (
					<th className="px-2 py-1 text-left" key={key}>
						{value}
					</th>
				);
			}

			const levelUnlocked = column.biggerIsBetter
				? user[column.name] >= value
				: user[column.name] <= value;
			return (
				<td
					key={key}
					className={`px-2 py-1 text-right ${
						levelUnlocked ? 'text-gray-50 bg-green-500 dark:bg-green-700' : ''
					}`}
				>
					{`${value} ${column.unit}`}
				</td>
			);
		});

		return (
			<tr className="border-b" key={dataRow.tier}>
				{cells}
			</tr>
		);
	});
}

function DataTable() {
	return (
		<div className="overflow-auto">
			<table className="w-full">
				<thead>
					<tr className="border-b-2">
						<HeaderRow />
					</tr>
				</thead>
				<tbody>
					<Rows />
				</tbody>
			</table>
		</div>
	);
}

export default DataTable;
