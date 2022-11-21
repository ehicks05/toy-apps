import { ParsedTransactionMeta } from '@solana/web3.js';

interface Props {
  meta: ParsedTransactionMeta | null;
}

const TransactionMetaTable = ({ meta }: Props) => {
  return (
    <table cellPadding={16} className="bg-sky-800">
      <thead>
        <tr>{/* <th colSpan={5}>Meta</th> */}</tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div className="flex flex-col gap-2">
              {meta?.computeUnitsConsumed && (
                <div>computeUnitsConsumed: {meta?.computeUnitsConsumed}</div>
              )}
              {meta?.err && <div>err: {meta?.err.toString()}</div>}
              {meta?.loadedAddresses && (
                <div>loadedAddresses: {meta?.loadedAddresses.toString()}</div>
              )}
              {meta?.innerInstructions && meta.innerInstructions.length > 0 && (
                <div>
                  innerInstructions: {meta?.innerInstructions.toString()}
                </div>
              )}
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot></tfoot>
    </table>
  );
};

export default TransactionMetaTable;
