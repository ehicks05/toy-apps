import { inRange } from 'lodash';
import { ByteString } from './';

const JsonTable = ({ rows }: { rows: any[] }) => {
  if (rows.length === 0) return null;

  const keys = Object.keys(rows[0]);
  const header = keys.map((o) => <th key={o}>{o}</th>);

  const body = rows.map((row) => (
    <tr key={Math.random()}>
      {Object.values(row).map((value) => {
        if (Array.isArray(value))
          return (
            <td key={Math.random()}>
              {typeof value}
              <JsonTable rows={value} />
            </td>
          );

        const isByteString =
          (typeof value === 'object' && 'toBase58' in value!) ||
          (typeof value === 'string' &&
            inRange(value.length, 32, 45) &&
            !value.includes(' '));

        if (isByteString)
          return (
            <td key={Math.random()}>
              <ByteString input={value} />
            </td>
          );

        if (['string', 'number', 'boolean'].includes(typeof value))
          return <td key={Math.random()}>{value as string}</td>;

        if (!value) return <td>??</td>;

        if (typeof value === 'object') {
          return (
            <td key={Math.random()}>
              <JsonTable rows={[value]} />
            </td>
          );
        }

        return <span key={Math.random()}>uh oh</span>;
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
