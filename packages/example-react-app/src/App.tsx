import { useContext, useEffect, useState } from 'react';
import type { ProviderChainId, providers } from 'web3';

import { AccountProvider } from './web3/AccountContext';
import { type IWeb3Context, Web3Context } from './web3/Web3Context';

import Accounts from './Accounts';
import ProviderButton from './ProviderButton';
import WalletRpcPlugComponent from './WalletRpcPlugComponent';

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

    const provider = web3Context.currentProvider.provider;

    function updateChainId(newId: bigint) {
      setChainId(newId);
    }

    function updateProviderIds(newId: ProviderChainId) {
      setChainId(BigInt(newId));
      web3Context.web3.eth.net.getId().then(setNetworkId);
    }

    web3Context.web3.eth.getChainId().then(updateChainId);
    web3Context.web3.eth.net.getId().then(setNetworkId);
    provider.on('chainChanged', updateProviderIds);
    return () => provider.removeListener('chainChanged', updateProviderIds);
  }, [web3Context.currentProvider, web3Context.web3.eth]);

  return (
    <main>
      <h1>Web3.js Wallet RPC Methods Demonstration dApp</h1>
      <div>This is a sample project that demonstrates using web3-plugin-wallet-rpc.</div>
      {!hasProviders ? (
        <h2>Install a Wallet</h2>
      ) : web3Context.currentProvider === undefined ? (
        <>
          <h2>Select a Provider</h2>
          {web3Context.providers.map((provider: providers.EIP6963ProviderDetail) => {
            return (
              <div key={provider.info.uuid}>
                <ProviderButton provider={provider}></ProviderButton>
              </div>
            );
          })}
        </>
      ) : (
        <>
          {web3Context.providers.length > 1 ? (
            <>
              <h2>Switch Provider</h2>
              {web3Context.providers.map((provider: providers.EIP6963ProviderDetail) => {
                if (provider.info.uuid === web3Context.currentProvider?.info.uuid) {
                  return null;
                }
                return (
                  <div key={provider.info.uuid}>
                    <ProviderButton provider={provider}></ProviderButton>
                  </div>
                );
              })}
            </>
          ) : null}
          <h2>Network Details</h2>
          <div>Chain ID: {`${chainId}`}</div>
          <div>Network ID: {`${networkId}`}</div>
          <AccountProvider>
            <Accounts></Accounts>
          </AccountProvider>

          <WalletRpcPlugComponent></WalletRpcPlugComponent>
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
