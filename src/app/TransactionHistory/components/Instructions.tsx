import {
  ParsedInstruction,
  PartiallyDecodedInstruction,
} from '@solana/web3.js';
import { TbTable, TbTableOff } from 'react-icons/tb';
import { useToggle } from 'react-use';
import { ByteString, JsonTable } from '../../../core-components';
import { shortenRecur } from '../../../utils/utils';

interface InstructionProps {
  instruction: ParsedInstruction | PartiallyDecodedInstruction;
}

const Instruction = ({ instruction }: InstructionProps) => {
  const [isTableView, toggleIsTableView] = useToggle(false);
  const icon = isTableView ? (
    <TbTable className="text-green-500" onClick={toggleIsTableView} size={24} />
  ) : (
    <TbTableOff onClick={toggleIsTableView} size={24} />
  );
  const isParsed = 'program' in instruction;
  return (
    <>
      <div>
        Program: <ByteString input={instruction.programId} /> [
        {isParsed && instruction.program}]
      </div>
      {isParsed && (
        <div>
          <div className="flex gap-2">
            Parsed Ix:
            {icon}
          </div>
          <pre>
            {isTableView && <JsonTable rows={[instruction.parsed]} />}
            {!isTableView &&
              JSON.stringify(shortenRecur(instruction.parsed), null, 1)}
          </pre>
        </div>
      )}
      {!isParsed && (
        <div>
          Accounts:
          {instruction.accounts.map((account) => (
            <ByteString input={account} key={account.toBase58()} />
          ))}
        </div>
      )}
      {!isParsed && (
        <div>
          Data:
          <pre>{JSON.stringify(instruction.data, null, 2)}</pre>
        </div>
      )}
    </>
  );
};

interface InstructionsTableProps {
  instructions: (ParsedInstruction | PartiallyDecodedInstruction)[];
}

const Instructions = ({ instructions }: InstructionsTableProps) => {
  return (
    <div className="bg-sky-900 p-2 text-sm sm:text-base">
      <div className="pb-4 font-bold">Instructions</div>
      <div>
        {instructions.map((instruction, i) => (
          <div key={i}>
            <Instruction instruction={instruction} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructions;
