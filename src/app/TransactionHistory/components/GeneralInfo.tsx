import { ByteString } from '../../../core-components';
import { SignatureWithTransaction } from '../../../types/types';
import { format } from 'date-fns';
import { nf } from '../../../utils/utils';

interface GeneralInfoProps {
  transaction: SignatureWithTransaction;
}

const GeneralInfo = ({
  transaction: { err, memo, signature, slot, transaction, blockTime },
}: GeneralInfoProps) => {
  const {
    meta,
    transaction: { message },
  } = transaction;

  const blockDatetime = {
    date: format(new Date((blockTime || 0) * 1000), 'yyyy-MM-dd'),
    time: format(new Date((blockTime || 0) * 1000), 'hh:mm:ssa'),
  };

  return (
    <div className="flex flex-col justify-items-start gap-2 bg-sky-900 p-2">
      <div>
        <div>
          <div>{blockDatetime.date}</div>
          <div>{blockDatetime.time}</div>
        </div>
      </div>
      <div>
        <div>Signature:</div>
        <div>
          <ByteString input={signature} />
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
      {transaction.transaction.signatures.length !== 1 && (
        <div>
          <div>Signatures</div>
          {transaction.transaction.signatures.map((o) => (
            <ByteString input={o} key={o} />
          ))}
        </div>
      )}
      <div>
        <div>Slot:</div>
        <div>
          <div>{nf.format(slot)}</div>
        </div>
      </div>
      {message.addressTableLookups && (
        <div>
          <div>Address Table Lookups</div>
          {message.addressTableLookups.map((o) => (
            <ByteString input={o.accountKey} key={o.accountKey.toBase58()} />
          ))}
        </div>
      )}
      <div>{transaction.version?.toString()}</div>

      {err && (
        <div>
          <div>Err:</div>
          <div>{err?.toString()}</div>
        </div>
      )}
      {memo && (
        <div>
          <div>Memo:</div>
          <div>{memo}</div>
        </div>
      )}
    </div>
  );
};

export default GeneralInfo;
