import { ByteString } from '../../core-components';
import { SignatureWithTransaction } from '../../types/types';
import { blockTimeToISO, nf } from '../utils';
import {
  Accounts,
  Instructions,
  LogMessages,
  TransactionMetaTable,
} from './components';

interface Props {
  parsedTransactions: SignatureWithTransaction[];
}

const TransactionTable = ({ parsedTransactions }: Props) => {
  return (
    <div className="bg-sky-700 p-4">
      <div className="pb-4 text-center font-bold">Transaction History</div>
      <div className="flex flex-col gap-4">
        {parsedTransactions?.map((o) => {
          if (!o) return 'missing';

          const {
            meta,
            transaction,
            transaction: { message },
          } = o.transaction;

          return (
            <div className="flex gap-2" key={o.signature}>
              <div className="flex flex-col justify-items-start gap-2 bg-sky-800 p-2">
                <div>
                  <div>
                    <div>{blockTimeToISO(o.blockTime || 0).slice(0, 10)}</div>
                    <div>{blockTimeToISO(o.blockTime || 0).slice(11)}</div>
                  </div>
                </div>
                <div>
                  <div>Slot:</div>
                  <div>
                    <div>{nf.format(o.slot)}</div>
                  </div>
                </div>
                <div>
                  <div>Signature:</div>
                  <div>
                    <ByteString input={o.signature} />
                  </div>
                </div>
                {meta?.fee && (
                  <div>
                    <div>Fee:</div>
                    <div>{nf.format(meta?.fee)}</div>
                  </div>
                )}
                <div>
                  <div>Recent Blockhash</div>
                  <ByteString input={message.recentBlockhash} />
                </div>
                <div>
                  <div>Signatures</div>
                  {transaction.signatures.map((o) => (
                    <ByteString input={o} key={o} />
                  ))}
                </div>
                {message.addressTableLookups && (
                  <div>
                    <div>Address Table Lookups</div>
                    {message.addressTableLookups.map((o) => (
                      <ByteString
                        input={o.accountKey}
                        key={o.accountKey.toBase58()}
                      />
                    ))}
                  </div>
                )}
                <div>{o.transaction.version?.toString()}</div>

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
              </div>
              <div>
                <div className="flex flex-col gap-2">
                  <Accounts accounts={message.accountKeys} meta={meta} />
                  <Instructions instructions={message.instructions} />
                  <LogMessages
                    logMessages={o.transaction.meta?.logMessages || undefined}
                  />
                  <TransactionMetaTable meta={meta} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionTable;
