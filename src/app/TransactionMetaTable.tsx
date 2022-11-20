import { ParsedTransactionMeta, PublicKey } from '@solana/web3.js';
import { Button } from '../core-components';

type Balances = Pick<
  ParsedTransactionMeta,
  'preBalances' | 'preTokenBalances' | 'postBalances' | 'postTokenBalances'
>;

interface BalancesTableProps {
  accounts: PublicKey[];
  balances: Balances;
}

const BalancesTable = ({ accounts, balances }: BalancesTableProps) => {
  return (
    <table cellPadding={16} className="bg-sky-800">
      <thead>
        <tr>
          <th colSpan={5}>Balances</th>
        </tr>
        <tr>
          <th>Account</th>
          <th>Pre</th>
          <th>Post</th>
          <th>TokenPre</th>
          <th>TokenPost</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div className="flex flex-col gap-2">
              misc:
              {balances.preBalances && (
                <div>computeUnitsConsumed: {meta?.computeUnitsConsumed}</div>
              )}
              {meta?.loadedAddresses && (
                <div>loadedAddresses: {meta?.loadedAddresses.toString()}</div>
              )}
              {meta?.innerInstructions && (
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

interface Props {
  meta: ParsedTransactionMeta | null;
}

const TransactionMetaTable = ({ meta }: Props) => {
  return (
    <table cellPadding={16} className="bg-sky-800">
      <thead>
        <tr>
          <th colSpan={5}>Meta</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div className="flex flex-col gap-2">
              misc:
              {meta?.computeUnitsConsumed && (
                <div>computeUnitsConsumed: {meta?.computeUnitsConsumed}</div>
              )}
              {meta?.err && <div>err: {meta?.err.toString()}</div>}
              {meta?.loadedAddresses && (
                <div>loadedAddresses: {meta?.loadedAddresses.toString()}</div>
              )}
              {meta?.innerInstructions && (
                <div>
                  innerInstructions: {meta?.innerInstructions.toString()}
                </div>
              )}
              {(meta as any)?.status && (
                <div>status: {(meta as any)?.status.toString()}</div>
              )}
            </div>
          </td>
          <td>fee: {meta?.fee}</td>
          <td>
            <Button
              onClick={() => alert(JSON.stringify(meta?.logMessages, null, 2))}
            >
              logMessages
            </Button>
          </td>
        </tr>
      </tbody>
      <tfoot></tfoot>
    </table>
  );
};

export default TransactionMetaTable;
