import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import type React from 'react';

import('@solana/wallet-adapter-react-ui/styles.css');

export const Wallet = ({ children }: { children: React.ReactNode }) => {
	const wallets = [new PhantomWalletAdapter()];

	return (
		<ConnectionProvider
			config={{ disableRetryOnRateLimit: true }}
			endpoint={'https://api.devnet.solana.com'}
		>
			<WalletProvider autoConnect wallets={wallets}>
				<WalletModalProvider>{children}</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	);
};
