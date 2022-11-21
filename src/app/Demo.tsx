import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from '@solana/wallet-adapter-react-ui';
import { ConfirmedSignatureInfo } from '@solana/web3.js';
import React, { FC, useEffect, useState } from 'react';
import { Button } from '../core-components';
import { useIntervalEffect } from '@react-hookz/web';
import { toSol } from './utils';
import { SignatureWithTransaction } from '../types/types';
import TransactionHistory from './TransactionHistory/TransactionHistory';
import {
  handleSendToRandomAddress,
  requestAirdrop,
} from '../services/solana-web3-api';

export const Demo: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [balance, setBalance] = useState(0);
  const [signatures, setSignatures] = useState<ConfirmedSignatureInfo[]>();
  const [parsedTransactions, setParsedTransactions] =
    useState<SignatureWithTransaction[]>();

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

  const getParsedTransactions = async () => {
    if (!publicKey || !signatures) return;
    const parsedTransactions = await connection.getParsedTransactions(
      signatures.map((o) => o.signature),
    );
    setParsedTransactions(
      signatures.map((signature, i) => ({
        ...signature,
        transaction: parsedTransactions[i]!,
      })),
    );
  };

  useIntervalEffect(() => {
    getBalance();
    getParsedTransactions();
  }, 30_000);

  useEffect(() => {
    if (!publicKey) return;
    getBalance();
    getAccountInfo();
  }, [publicKey]);

  useEffect(() => {
    if (!publicKey) return;
    getParsedTransactions();
  }, [signatures]);

  const handleRequestAirdrop = async () => {
    await requestAirdrop(connection, publicKey);
    await getBalance();
    await getParsedTransactions();
  };

  return (
    <div className="m-auto flex max-w-screen-xl flex-col gap-4">
      <WalletMultiButton />
      <WalletDisconnectButton />
      <Button
        disabled={!publicKey}
        onClick={() =>
          handleSendToRandomAddress(connection, publicKey, sendTransaction)
        }
      >
        Send SOL to a random address!
      </Button>
      <Button disabled={!publicKey} onClick={handleRequestAirdrop}>
        Request Airdrop
      </Button>
      <div>Balance: {toSol(balance)} Sol</div>

      {parsedTransactions && (
        <TransactionHistory transactions={parsedTransactions} />
      )}
    </div>
  );
};
