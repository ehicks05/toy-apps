import {
  ParsedInstruction,
  ParsedMessageAccount,
  ParsedTransaction,
  PartiallyDecodedInstruction,
} from '@solana/web3.js';
import { ByteString } from './ByteString';
import {
  TbPencil,
  TbPencilOff,
  TbSignature,
  TbSignatureOff,
} from 'react-icons/tb';
import { HiOutlineArrowsRightLeft } from 'react-icons/hi2';
import JsonTable from './JsonTable';

interface InstructionProps {
  instruction: ParsedInstruction | PartiallyDecodedInstruction;
}

const Instruction = ({ instruction }: InstructionProps) => {
  const isParsed = 'program' in instruction;
  return (
    <>
      <td>
        <div>
          <ByteString input={instruction.programId} />
        </div>
        <div>{isParsed && instruction.program}</div>
      </td>
      <td>
        <pre>{isParsed && <JsonTable rows={[instruction.parsed]} />}</pre>
      </td>

      {!isParsed && (
        <td>
          {instruction.accounts.map((account) => (
            <ByteString input={account} key={account.toBase58()} />
          ))}
        </td>
      )}
      {!isParsed && (
        <td>
          <pre>{JSON.stringify(instruction.data, null, 2)}</pre>
        </td>
      )}
    </>
  );
};

interface InstructionsTableProps {
  instructions: (ParsedInstruction | PartiallyDecodedInstruction)[];
}

const InstructionsTable = ({ instructions }: InstructionsTableProps) => {
  const isAllParsed = instructions.every((o) => 'program' in o);
  return (
    <table cellPadding={16} className="bg-sky-900">
      <thead>
        <tr>
          <th colSpan={5}>Instructions</th>
        </tr>
        <tr>
          <th>Program</th>
          <th>Parsed</th>
          {!isAllParsed && <th>accounts</th>}
          {!isAllParsed && <th>data</th>}
        </tr>
      </thead>
      <tbody>
        {instructions.map((instruction) => (
          <tr key={Math.random()}>
            <Instruction instruction={instruction} />
          </tr>
        ))}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
};

interface AccountKeysProps {
  accountKeys: ParsedMessageAccount[];
}

const AccountKeysTable = ({ accountKeys }: AccountKeysProps) => {
  return (
    <table cellPadding={16} className="bg-sky-900">
      <thead>
        <tr>
          <th colSpan={5}>Account Keys</th>
        </tr>
      </thead>
      <tbody>
        {accountKeys.map((accountKey) => (
          <tr key={accountKey.pubkey.toBase58()}>
            <td>
              <ByteString input={accountKey.pubkey} />
            </td>
            <td>
              {accountKey.source === 'transaction' ? (
                <HiOutlineArrowsRightLeft className="text-white" size={26} />
              ) : (
                accountKey.source
              )}
            </td>
            <td>
              {accountKey.signer ? (
                <TbSignature className="text-green-500" size={32} />
              ) : (
                <TbSignatureOff className="text-gray-500" size={32} />
              )}
            </td>
            <td>
              {accountKey.writable ? (
                <TbPencil className="text-green-500" size={32} />
              ) : (
                <TbPencilOff className="text-gray-500" size={32} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
};

interface Props {
  transaction: ParsedTransaction;
}

const Transaction = ({ transaction }: Props) => {
  return (
    <div className="flex flex-col gap-2 bg-sky-800">
      <div>
        <InstructionsTable instructions={transaction.message.instructions} />
      </div>
      <div>
        <AccountKeysTable accountKeys={transaction.message.accountKeys} />
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
