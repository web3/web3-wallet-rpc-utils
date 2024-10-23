import { useContext, useEffect, useState } from 'react';
import type { EIP6963ProviderDetail, ProviderChainId } from 'web3';

import { Accounts } from './components/Accounts';
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

  const [chainId, setChainId] = useState<bigint | undefined>(undefined);
  const [networkId, setNetworkId] = useState<bigint | undefined>(undefined);
  useEffect(() => {
    if (web3Context.currentProvider === undefined) {
      return;
    }

    const { provider } = web3Context.currentProvider;

    function updateChainId(newId: bigint) {
      setChainId(newId);
    }

    function updateProviderIds(newId: ProviderChainId) {
      setChainId(BigInt(newId));

      web3Context.web3.eth.net
        .getId()
        .then(setNetworkId)
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
        });
    }

    web3Context.web3.eth
      .getChainId()
      .then(updateChainId)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });

    web3Context.web3.eth.net
      .getId()
      .then(setNetworkId)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });

    provider.on('chainChanged', updateProviderIds);

    // eslint-disable-next-line consistent-return
    return () => {
      provider.removeListener('chainChanged', updateProviderIds);
    };
  }, [web3Context.currentProvider, web3Context.web3.eth]);

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
          {web3Context.providers.length > 1 && (
            <>
              <h2>Switch Provider</h2>
              {web3Context.providers.map((provider: EIP6963ProviderDetail) => {
                if (provider.info.uuid === web3Context.currentProvider?.info.uuid) {
                  return null;
                }

                return (
                  <div key={provider.info.uuid}>
                    <ProviderButton provider={provider} />
                  </div>
                );
              })}
            </>
          )}

          <h2>Network Details</h2>
          {chainId && <div>Chain ID: {`${chainId}`}</div>}
          {networkId && <div>Network ID: {`${networkId}`}</div>}

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

      <br />
      <i>
        This project was bootstrapped with{' '}
        <a href="https://github.com/facebook/create-react-app">Create React App</a>.
      </i>
    </main>
  );
}

export default App;
