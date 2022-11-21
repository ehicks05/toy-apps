import { ParsedTransaction } from '@solana/web3.js';
import { ByteString } from './ByteString';
import Instructions from './Instructions';

interface Props {
  transaction: ParsedTransaction;
}

const Transaction = ({ transaction }: Props) => {
  return (
    <div className="flex flex-col gap-2 bg-sky-800">
      <div>
        <Instructions instructions={transaction.message.instructions} />
      </div>
      <div>
        <div>Recent Blockhash</div>
        <ByteString input={transaction.message.recentBlockhash} />
      </div>
      <div>
        <div>Signatures</div>
        {transaction.signatures.map((o) => (
          <ByteString input={o} key={o} />
        ))}
      </div>
      <div>
        <div>Address Table Lookups</div>
        {(transaction.message.addressTableLookups || []).map((o) => (
          <ByteString input={o.accountKey} key={o.accountKey.toBase58()} />
        ))}
      </div>
    </div>
  );
};

export default Transaction;
