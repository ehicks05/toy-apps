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
    const balance = publicKey ? await connection.getBalance(publicKey) : 0;
    setBalance(balance);
  };

  const getSignatures = async () => {
    const signatures = publicKey
      ? await connection.getSignaturesForAddress(publicKey)
      : [];
    setSignatures(signatures);
  };

  const getParsedTransactions = async () => {
    if (!publicKey || !signatures) {
      setParsedTransactions([]);
      return;
    }

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
    const doIt = async () => {
      await getBalance();
      await getSignatures();
      await getParsedTransactions();
    };

    doIt();
  }, 30_000);

  useEffect(() => {
    getBalance();
    getSignatures();
  }, [publicKey]);

  useEffect(() => {
    getParsedTransactions();
  }, [signatures]);

  const handleRequestAirdrop = async () => {
    await requestAirdrop(connection, publicKey);
    await getBalance();
    await getSignatures();
    await getParsedTransactions();
  };

  return (
    <div className="m-auto flex max-w-screen-xl flex-col gap-4">
      <WalletMultiButton />
      <WalletDisconnectButton />
      <Button
        className="wallet-adapter-button wallet-adapter-button-trigger"
        disabled={!publicKey}
        onClick={() =>
          handleSendToRandomAddress(connection, publicKey, sendTransaction)
        }
      >
        Send SOL to a random address!
      </Button>
      <Button
        className="wallet-adapter-button wallet-adapter-button-trigger"
        disabled={!publicKey}
        onClick={handleRequestAirdrop}
      >
        Request Airdrop
      </Button>
      <div className="bg-sky-800 p-4 font-bold">
        PK: {publicKey?.toBase58()}
      </div>
      <div className="bg-sky-800 p-4 font-bold">
        Balance: {toSol(balance)} Sol
      </div>

      {parsedTransactions && (
        <TransactionHistory transactions={parsedTransactions} />
      )}
    </div>
  );
};
