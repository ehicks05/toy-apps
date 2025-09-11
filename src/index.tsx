import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Wallet as WalletProvider } from './components';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WalletProvider>
      <App />
    </WalletProvider>
  </StrictMode>,
);
