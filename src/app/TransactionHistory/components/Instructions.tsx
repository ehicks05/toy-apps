import {
  ParsedInstruction,
  PartiallyDecodedInstruction,
} from '@solana/web3.js';
import { ByteString, JsonTable } from '../../../core-components';

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

const Instructions = ({ instructions }: InstructionsTableProps) => {
  const isAllParsed = instructions.every((o) => 'program' in o);
  return (
    <table cellPadding={8} className="bg-sky-900">
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

export default Instructions;
