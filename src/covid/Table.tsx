import {
	flexRender,
	getPaginationRowModel,
	type PaginationState,
	useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import type { County } from './types';
import { getLocationDisplayName, pretty } from './utils';

const NUMBER_FORMAT = Intl.NumberFormat('en-US');
const formatNumber = (number: number) => NUMBER_FORMAT.format(number);

interface Props {
	data: any;
	counties: Record<number, County>;
	UIDs: number[];
}

const Table = ({ data, counties, UIDs }: Props) => {
	const columns = React.useMemo(
		() => [
			{
				header: 'Date',
				id: 'date',
				accessor: (row) => {
					return Object.values(row)[0].date;
				},
				disableSortBy: true,
			},
			{
				header: 'Confirmed Cases',
				columns: UIDs.map((uid) => ({
					header: `${getLocationDisplayName(counties[uid])}`,
					id: `${uid}-confirmed`,
					accessor: (row) => row[uid].confirmed,
					cell: ({ value }) => formatNumber(value),
				})),
			},
			{
				header: 'Active Cases',
				columns: UIDs.map((uid) => ({
					header: `${getLocationDisplayName(counties[uid])}`,
					id: `${uid}-active`,
					accessor: (row) => row[uid].active,
					cell: ({ value }) => formatNumber(value),
				})),
			},
			{
				header: 'Active Case %',
				columns: UIDs.map((uid) => ({
					Header: `${getLocationDisplayName(counties[uid])}`,
					id: `${uid}-active-%`,
					accessor: (row) => row[uid].activePercent,
					cell: ({ value }) => pretty(value),
				})),
			},
			{
				header: 'Deaths',
				columns: UIDs.map((uid) => ({
					Header: `${getLocationDisplayName(counties[uid])}`,
					id: `${uid}-deaths`,
					accessor: (row) => row[uid].deaths,
					cell: ({ value }) => formatNumber(value),
				})),
			},
		],
		[UIDs, counties],
	);

	const [pagination, setPagination] = React.useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const table = useReactTable({
		columns,
		data,
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination,
		state: { pagination },
	});

	return (
		<div className="m-auto overflow-x-auto">
			<h1 className="text-xl">Data</h1>
			<table className="text-xs">
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id} className="p-1 border font-bold">
									<div
										{...{
											className: header.column.getCanSort()
												? 'cursor-pointer select-none'
												: '',
											onClick: header.column.getToggleSortingHandler(),
										}}
									>
										{flexRender(header.column.columnDef.header, header.getContext())}
										{{
											asc: ' 🔼',
											desc: ' 🔽',
										}[header.column.getIsSorted() as string] ?? null}
									</div>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => {
						return (
							<tr key={row.id}>
								{row.getVisibleCells().map((cell) => {
									return (
										<td key={cell.id} className="p-1 border text-right">
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			{pagination.pageSize !== -1 && (
				<button
					type="button"
					onClick={() => setPagination({ pageIndex: 0, pageSize: -1 })}
				>
					Show All
				</button>
			)}
		</div>
	);
};

export default Table;
