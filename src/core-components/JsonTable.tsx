import { PublicKey } from '@solana/web3.js';
import { ByteString } from './';
import { isSolId } from './ByteString';

const determineType = (value: unknown) => {
  if (!value) return 'falsy';

  const isByteString =
    (typeof value === 'object' && 'toBase58' in value) ||
    (typeof value === 'string' && isSolId(value));

  if (Array.isArray(value)) {
    return 'array';
  } else if (isByteString) {
    return 'byteString';
  } else if (['string', 'number', 'boolean'].includes(typeof value)) {
    return 'scalar';
  } else if (typeof value === 'object') {
    return 'object';
  }
};

const JsonTable = ({ rows }: { rows: unknown[] }) => {
  if (!Array.isArray(rows) || rows.length === 0) return null;

  const keys = Object.keys(rows[0]);
  const header = keys.map((o) => <th key={o}>{o}</th>);

  const body = rows.map((row) => (
    <tr key={Math.random()}>
      {Object.values(row).map((value, i) => {
        if (!value) return <td>??</td>;

        const type = determineType(value);
        let cellContents;

        switch (type) {
          case 'array':
            cellContents = <JsonTable rows={value as []} />;
            break;
          case 'byteString':
            cellContents = <ByteString input={value as string | PublicKey} />;
            break;
          case 'scalar':
            cellContents = value as string;
            break;
          case 'object':
            cellContents = <JsonTable rows={[value]} />;
            break;
          case 'falsy':
          default:
            cellContents = value as string;
        }

        return <td key={i}>{cellContents}</td>;
      })}
    </tr>
  ));

  return (
    <table cellPadding={8} className="border border-white text-sm">
      <thead>
        <tr>{header}</tr>
      </thead>
      <tbody>{body}</tbody>
    </table>
  );
};

export default JsonTable;
