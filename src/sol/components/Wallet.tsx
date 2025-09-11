import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import type React from 'react';
import { useMemo } from 'react';

import('@solana/wallet-adapter-react-ui/styles.css');

export const Wallet = ({ children }: { children: React.ReactNode }) => {
	const network = WalletAdapterNetwork.Devnet;
	const endpoint = useMemo(() => clusterApiUrl(network), [network]);

	const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

	return (
		<ConnectionProvider
			config={{ disableRetryOnRateLimit: true }}
			endpoint={endpoint}
		>
			<WalletProvider autoConnect wallets={wallets}>
				<WalletModalProvider>{children}</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	);
};
