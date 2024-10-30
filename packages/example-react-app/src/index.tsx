import React from 'react';
import ReactDOM from 'react-dom/client';

import { Web3Provider } from './web3/Web3Context';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Web3Provider>
      <App />
    </Web3Provider>
  </React.StrictMode>,
);
