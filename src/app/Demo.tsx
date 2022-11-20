import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from '@solana/wallet-adapter-react-ui';
import {
  ConfirmedSignatureInfo,
  Keypair,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Button } from '../core-components';
import { useIntervalEffect } from '@react-hookz/web';

const nf = new Intl.NumberFormat();
const shorten = (input: string) => `${input.slice(0, 4)}..${input.slice(-4)}`;

const formatSol = (lamports: number) => nf.format(lamports / LAMPORTS_PER_SOL);

export const Demo: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [balance, setBalance] = useState(0);
  const [signatures, setSignatures] = useState<
    ConfirmedSignatureInfo[] | null
  >();

  const getBalance = async () => {
    if (!publicKey) return;
    const balance = await connection.getBalance(publicKey);
    setBalance(balance);
  };

  const getAccountInfo = async () => {
    if (!publicKey) return;
    const signatures = await connection.getSignaturesForAddress(publicKey);
    setSignatures(signatures);
  };

  useIntervalEffect(() => getBalance(), 30_000);

  useEffect(() => {
    if (!publicKey) return;
    getBalance();
    getAccountInfo();
  }, [publicKey]);

  const handleSendToRandomAddress = useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError();

    const lamports = await connection.getMinimumBalanceForRentExemption(0);

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        lamports,
        toPubkey: Keypair.generate().publicKey,
      }),
    );

    const {
      context: { slot: minContextSlot },
      value: { blockhash, lastValidBlockHeight },
    } = await connection.getLatestBlockhashAndContext();

    const signature = await sendTransaction(transaction, connection, {
      minContextSlot,
    });

    await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature,
    });
  }, [publicKey, sendTransaction, connection]);

  const requestAirdrop = async () => {
    if (publicKey) {
      try {
        await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="m-auto flex max-w-screen-lg flex-col gap-4">
      <WalletMultiButton />
      <WalletDisconnectButton />
      <Button disabled={!publicKey} onClick={handleSendToRandomAddress}>
        Send SOL to a random address!
      </Button>
      <Button onClick={() => requestAirdrop()}>Request Airdrop</Button>
      <Button disabled>Balance: {formatSol(balance)} Sol</Button>

      <table cellPadding={16} className="bg-sky-700">
        <thead>
          <tr>
            <th colSpan={5}>Transaction History</th>
          </tr>
          <tr>
            <th>blockTime</th>
            <th>slot</th>
            <th>signature</th>
            <th>err</th>
            <th>memo</th>
          </tr>
        </thead>
        <tbody>
          {signatures?.map((o) => (
            <tr key={o.signature}>
              <td>{new Date((o.blockTime || 0) * 1000).toISOString()}</td>
              <td>{o.slot}</td>
              <td className="font-mono">{shorten(o.signature)}</td>
              <td>{o.err?.toString()}</td>
              <td>{o.memo}</td>
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
};
