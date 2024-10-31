import { useContext, useEffect, useState } from 'react';
import type { EIP6963ProviderDetail } from 'web3';

import { Accounts } from './components/Accounts';
import { ChainId } from './components/ChainId';
import { ProviderButton } from './components/ProviderButton';
import { AddEthereumChain } from './wallet-components/AddEthereumChain';
import { Permissions } from './wallet-components/Permissions';
import { SwitchEthereumChain } from './wallet-components/SwitchEthereumChain';
import { WatchAsset } from './wallet-components/WatchAsset';
import { AccountProvider } from './web3/AccountContext';
import { type IWeb3Context, Web3Context } from './web3/Web3Context';

function App() {
  const web3Context: IWeb3Context = useContext(Web3Context);
  const [hasProviders, setHasProviders] = useState<boolean>(false);

  useEffect(() => {
    setHasProviders(web3Context.providers.length > 0);
  }, [web3Context.providers.length]);

  return (
    <main>
      <h1>Web3.js Wallet RPC Methods Demonstration dApp</h1>
      <div>This is a sample project that demonstrates using web3-plugin-wallet-rpc.</div>

      {!hasProviders && <h2>Install a Wallet</h2>}

      {hasProviders && !web3Context.currentProvider && (
        <>
          <h2>Select a Provider</h2>
          {web3Context.providers.map((provider: EIP6963ProviderDetail) => (
            <div key={provider.info.uuid}>
              <ProviderButton provider={provider} />
            </div>
          ))}
        </>
      )}

      {hasProviders && web3Context.currentProvider && (
        <>
          <h2>Current Provider</h2>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={web3Context.currentProvider.info.icon}
              alt={web3Context.currentProvider.info.name}
              width="35"
            />
            <span>{web3Context.currentProvider.info.name}</span>
          </div>
          <ChainId />

          {web3Context.providers.length > 1 && (
            <>
              <h2>Switch Provider</h2>
              {web3Context.providers.map((provider: EIP6963ProviderDetail) => {
                if (provider.info.uuid === web3Context.currentProvider?.info.uuid) {
                  return null;
                }

                return (
                  <div key={provider.info.uuid} style={{ display: 'inline-block' }}>
                    <ProviderButton provider={provider} />
                  </div>
                );
              })}
            </>
          )}

          <AccountProvider>
            <Accounts />
          </AccountProvider>

          <h2>Wallet RPC Methods</h2>
          <div>
            <AddEthereumChain />
            <SwitchEthereumChain />
            <WatchAsset />
            <Permissions />
          </div>
        </>
      )}
    </main>
  );
}

export default App;
