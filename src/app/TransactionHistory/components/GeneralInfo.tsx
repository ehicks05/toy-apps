import { ByteString } from "../../../core-components";
import { SignatureWithTransaction } from "../../../types/types";
import { blockTimeToISO, nf } from "../../utils";

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

  return (
    <div className="flex flex-col justify-items-start gap-2 bg-sky-900 p-2">
      <div>
        <div>
          <div>{blockTimeToISO(blockTime || 0).slice(0, 10)}</div>
          <div>{blockTimeToISO(blockTime || 0).slice(11)}</div>
        </div>
      </div>
      <div>
        <div>Slot:</div>
        <div>
          <div>{nf.format(slot)}</div>
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
      <div>
        <div>Signatures</div>
        {transaction.transaction.signatures.map((o) => (
          <ByteString input={o} key={o} />
        ))}
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
