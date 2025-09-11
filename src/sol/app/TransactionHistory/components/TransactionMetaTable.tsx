import type { ParsedTransactionMeta } from '@solana/web3.js';

interface Props {
	meta: ParsedTransactionMeta | null;
}

const TransactionMetaTable = ({ meta }: Props) => {
	const { computeUnitsConsumed, err, loadedAddresses, innerInstructions } =
		meta || {};

	if (
		!computeUnitsConsumed &&
		!err &&
		!loadedAddresses &&
		!innerInstructions?.length
	)
		return null;

	return (
		<table cellPadding={8} className="bg-sky-900">
			<thead>
				<tr>{/* <th colSpan={5}>Meta</th> */}</tr>
			</thead>
			<tbody>
				<tr>
					<td className='p-2'>
						<div className="flex flex-col gap-2">
							{computeUnitsConsumed && (
								<div>computeUnitsConsumed: {computeUnitsConsumed}</div>
							)}
							{err && <div>err: {err.toString()}</div>}
							{loadedAddresses && (
								<div>loadedAddresses: {loadedAddresses.toString()}</div>
							)}
							{innerInstructions && innerInstructions.length > 0 && (
								<div>innerInstructions: {innerInstructions.toString()}</div>
							)}
						</div>
					</td>
				</tr>
			</tbody>
			<tfoot />
		</table>
	);
};

export default TransactionMetaTable;
