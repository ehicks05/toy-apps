import { Wallet as WalletProvider } from './components';
import { Home } from './app/index';
import { Footer, Header } from './components';
import './index.css';

export function Sol() {
	document.title = 'Sol';

	return (
		    <WalletProvider>
<div className="flex min-h-screen flex-col bg-gradient-to-tr from-violet-900 to-gray-900 text-gray-50">
			<Header />
			<div className="flex h-full flex-grow flex-col p-4 pt-0">
				<Home />
			</div>
			<Footer />
		</div></WalletProvider>
	);
}
