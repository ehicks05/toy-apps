import { ByteString } from './ByteString';
import TransactionMetaTable from './TransactionMetaTable';
import Transaction from './Transaction';
import { SignatureWithTransaction } from './types';
import { blockTimeToISO } from './utils';
import { Button } from '../core-components';
import Accounts from './Accounts';

const nf = Intl.NumberFormat('en-US', { notation: 'scientific' });

interface Props {
  parsedTransactions: SignatureWithTransaction[];
}

const TransactionTable = ({ parsedTransactions }: Props) => {
  return (
    <table cellPadding={16} className="bg-sky-700">
      <thead>
        <tr>
          <th colSpan={5}>Transaction History</th>
        </tr>
      </thead>
      <tbody>
        {parsedTransactions?.map((o) => {
          if (!o) return 'missing';

          return (
            <tr key={o.signature}>
              <td className="flex flex-col justify-items-start gap-2">
                <div>
                  <div>When:</div>
                  <div>
                    <div>{blockTimeToISO(o.blockTime || 0).slice(0, 10)}</div>
                    <div>{blockTimeToISO(o.blockTime || 0).slice(11)}</div>
                  </div>
                </div>
                <div>
                  <div>Slot:</div>
                  <div>
                    <div>{o.slot}</div>
                  </div>
                </div>
                <div>
                  <div>Signature:</div>
                  <div>
                    <ByteString input={o.signature} />
                  </div>
                </div>
                {o.transaction.meta?.fee && (
                  <div>
                    <div>Fee:</div>
                    <div>{nf.format(o.transaction.meta?.fee)}</div>
                  </div>
                )}
                <div>
                  <Button
                    onClick={() =>
                      alert(
                        JSON.stringify(
                          o.transaction.meta?.logMessages,
                          null,
                          2,
                        ),
                      )
                    }
                  >
                    logMessages
                  </Button>
                </div>
                {o.err && (
                  <div>
                    <div>Err:</div>
                    <div>{o.err?.toString()}</div>
                  </div>
                )}
                {o.memo && (
                  <div>
                    <div>Memo:</div>
                    <div>{o.memo}</div>
                  </div>
                )}
              </td>
              <td>
                <div className="flex flex-col gap-2">
                  <Accounts
                    accounts={o.transaction.transaction.message.accountKeys}
                    meta={o.transaction.meta}
                  />
                  <TransactionMetaTable meta={o.transaction.meta} />
                  <Transaction transaction={o.transaction.transaction} />
                  <div>{o.transaction.version}</div>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
};

export default TransactionTable;
