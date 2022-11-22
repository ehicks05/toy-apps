import { ParsedMessageAccount, ParsedTransactionMeta } from '@solana/web3.js';
import {
  TbArrowsLeftRight,
  TbTable,
  TbSignature,
  TbSignatureOff,
  TbPencil,
  TbPencilOff,
} from 'react-icons/tb';
import { MdChangeHistory } from 'react-icons/md';
import { ByteString } from '../../../core-components';

const nf = Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
  notation: 'scientific',
});
const ICON_SIZE = 24;

interface AccountsProps {
  accounts: ParsedMessageAccount[];
  meta: ParsedTransactionMeta | null;
}

const Source = ({ source }: { source?: string }) => {
  if (!source) return null;
  return source === 'transaction' ? (
    <TbArrowsLeftRight
      className="w-full text-white"
      size={ICON_SIZE}
      title={source}
    />
  ) : (
    <TbTable className="w-full text-white" size={ICON_SIZE} title={source} />
  );
};
const Signer = ({ signer }: { signer: boolean }) => {
  return signer ? (
    <TbSignature
      className="w-full text-green-500"
      size={ICON_SIZE}
      title="signer: true"
    />
  ) : (
    <TbSignatureOff
      className="w-full text-gray-500"
      size={ICON_SIZE}
      title="signer: false"
    />
  );
};
const Writable = ({ writable }: { writable: boolean }) => {
  return writable ? (
    <TbPencil
      className="w-full text-green-500"
      size={ICON_SIZE}
      title="writable: true"
    />
  ) : (
    <TbPencilOff
      className="w-full text-gray-500"
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
    <table cellPadding={4} className="bg-sky-900 text-sm sm:text-base">
      <thead>
        <tr>
          <th colSpan={10}>Accounts</th>
        </tr>
        <tr>
          <th>Account</th>
          <th className="text-right">Pre</th>
          <th className="hidden sm:table-cell">
            <div className="flex w-full justify-end">
              <MdChangeHistory size={ICON_SIZE} />
            </div>
          </th>
          <th className="text-right">Post</th>
          {hasTokenBalances && (
            <>
              <th className="text-right">PreToken</th>
              <th className="text-right">PostToken</th>
            </>
          )}
          <th className="hidden sm:table-cell">Source</th>
          <th className="hidden sm:table-cell">Signer</th>
          <th className="hidden sm:table-cell">Writable</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map((accountKey, i) => (
          <tr key={accountKey.pubkey.toBase58()}>
            <td>
              <ByteString input={accountKey.pubkey} />
            </td>

            <td className="text-right">{nf.format(preBalances?.[i] || 0)}</td>
            <td className="hidden text-right sm:table-cell">
              {nf.format((preBalances?.[i] || 0) - (postBalances?.[i] || 0))}
            </td>
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
