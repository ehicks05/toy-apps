import { ParsedMessageAccount, ParsedTransactionMeta } from '@solana/web3.js';
import {
  TbArrowsLeftRight,
  TbTable,
  TbSignature,
  TbSignatureOff,
  TbPencil,
  TbPencilOff,
} from 'react-icons/tb';
import { ByteString } from '../../../core-components';

const nf = Intl.NumberFormat('en-US', { notation: 'scientific' });
const ICON_SIZE = 28;

interface AccountsProps {
  accounts: ParsedMessageAccount[];
  meta: ParsedTransactionMeta | null;
}

const Source = ({ source }: { source?: string }) => {
  if (!source) return null;
  return source === 'transaction' ? (
    <TbArrowsLeftRight className="text-white" size={ICON_SIZE} title={source} />
  ) : (
    <TbTable className="text-white" size={ICON_SIZE} title={source} />
  );
};
const Signer = ({ signer }: { signer: boolean }) => {
  return signer ? (
    <TbSignature
      className="text-green-500"
      size={ICON_SIZE}
      title="signer: true"
    />
  ) : (
    <TbSignatureOff
      className="text-gray-500"
      size={ICON_SIZE}
      title="signer: false"
    />
  );
};
const Writable = ({ writable }: { writable: boolean }) => {
  return writable ? (
    <TbPencil
      className="text-green-500"
      size={ICON_SIZE}
      title="writable: true"
    />
  ) : (
    <TbPencilOff
      className="text-gray-500"
      size={ICON_SIZE}
      title="writable: false"
    />
  );
};

const Accounts = ({ accounts, meta }: AccountsProps) => {
  const { preBalances, postBalances, preTokenBalances, postTokenBalances } =
    meta || {};
  const hasTokenBalances = [
    ...(preTokenBalances ? preTokenBalances : []),
    ...(postTokenBalances ? postTokenBalances : []),
  ].some((o) => o.uiTokenAmount);

  return (
    <table cellPadding={8} className="bg-sky-900">
      <thead>
        <tr>
          <th colSpan={10}>Accounts</th>
        </tr>
        <tr>
          <th>Account</th>
          <th className="text-right">Pre</th>
          <th className="text-right">Post</th>
          {hasTokenBalances && (
            <>
              <th className="text-right">PreToken</th>
              <th className="text-right">PostToken</th>
            </>
          )}
          <th>Source</th>
          <th>Signer</th>
          <th>Writable</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map((accountKey, i) => (
          <tr key={accountKey.pubkey.toBase58()}>
            <td>
              <ByteString input={accountKey.pubkey} />
            </td>

            <td className="text-right">{nf.format(preBalances?.[i] || 0)}</td>
            <td className="text-right">{nf.format(postBalances?.[i] || 0)}</td>

            {hasTokenBalances && (
              <>
                <td className="text-right">
                  {JSON.stringify(preTokenBalances?.[i], null, 2)}
                </td>
                <td className="text-right">
                  {JSON.stringify(postTokenBalances?.[i], null, 2)}
                </td>
              </>
            )}

            <td>
              <Source source={accountKey.source} />
            </td>
            <td>
              <Signer signer={accountKey.signer} />
            </td>
            <td>
              <Writable writable={accountKey.writable} />
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
};

export default Accounts;
