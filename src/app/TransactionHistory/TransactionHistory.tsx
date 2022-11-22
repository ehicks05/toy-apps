import { SignatureWithTransaction } from '../../types/types';
import {
  Accounts,
  GeneralInfo,
  Instructions,
  LogMessages,
  TransactionMetaTable,
} from './components';

interface Props {
  transactions: SignatureWithTransaction[];
}

const TransactionTable = ({ transactions }: Props) => {
  return (
    <div className="bg-sky-800 p-4">
      <div className="pb-4 text-center font-bold">Transaction History</div>
      <div className="flex flex-col gap-4">
        {transactions?.map((transaction) => {
          if (!transaction) return 'missing';

          const {
            meta,
            transaction: { message },
          } = transaction.transaction;

          return (
            <div
              className="flex flex-col gap-2 sm:flex-row"
              key={transaction.signature}
            >
              <GeneralInfo transaction={transaction} />
              <div>
                <div className="flex flex-col gap-2">
                  <Accounts accounts={message.accountKeys} meta={meta} />
                  <Instructions instructions={message.instructions} />
                  <LogMessages logMessages={meta?.logMessages || undefined} />
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
