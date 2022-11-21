import { ParsedTransactionMeta, PublicKey } from '@solana/web3.js';
import { Button } from '../core-components';
import { ByteString } from './ByteString';

type Balances = Pick<
  ParsedTransactionMeta,
  'preBalances' | 'preTokenBalances' | 'postBalances' | 'postTokenBalances'
>;

interface BalancesTableProps {
  accounts: PublicKey[];
  balances: Balances;
}

const BalancesTable = ({
  accounts,
  balances: { preBalances, postBalances, preTokenBalances, postTokenBalances },
}: BalancesTableProps) => {
  const hasToken = [
    ...(preTokenBalances ? preTokenBalances : []),
    ...(postTokenBalances ? postTokenBalances : []),
  ].some((o) => o.uiTokenAmount);
  return (
    <table cellPadding={8} className="bg-sky-800">
      <thead>
        <tr>
          <th colSpan={5}>Balances</th>
        </tr>
        <tr>
          <th>Account</th>
          <th className="text-right">Pre</th>
          <th className="text-right">Post</th>
          {hasToken && (
            <>
              <th className="text-right">PreToken</th>
              <th className="text-right">PostToken</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {accounts.map((account, i) => {
          return (
            <tr key={account.toBase58()}>
              <td>
                <ByteString input={account} />
              </td>
              <td className="text-right">{preBalances[i]}</td>
              <td className="text-right">{postBalances[i]}</td>

              {hasToken && (
                <>
                  <td className="text-right">
                    {JSON.stringify(preTokenBalances?.[i], null, 2)}
                  </td>
                  <td className="text-right">
                    {JSON.stringify(postTokenBalances?.[i], null, 2)}
                  </td>
                </>
              )}
            </tr>
          );
        })}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
};

interface Props {
  accounts: PublicKey[];
  meta: ParsedTransactionMeta | null;
}

const TransactionMetaTable = ({ accounts, meta }: Props) => {
  return (
    <table cellPadding={16} className="bg-sky-800">
      <thead>
        <tr>{/* <th colSpan={5}>Meta</th> */}</tr>
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
            <BalancesTable
              accounts={accounts}
              balances={{
                postBalances: meta?.postBalances || [],
                postTokenBalances: meta?.postTokenBalances,
                preBalances: meta?.preBalances || [],
                preTokenBalances: meta?.preTokenBalances,
              }}
            />
          </td>
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
