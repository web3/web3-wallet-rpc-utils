import { useContext, useEffect, useState } from 'react';
import { type ProviderChainId } from 'web3';

import { Web3Context } from '../web3/Web3Context';

export function ChainId() {
  const { currentProvider } = useContext(Web3Context);
  const [chainId, setChainId] = useState<bigint | undefined>(undefined);

  useEffect(() => {
    currentProvider?.provider
      .request({ method: 'eth_chainId' })
      .then((id) => {
        setChainId(BigInt(id as string));
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }, [currentProvider]);

  useEffect(() => {
    if (currentProvider === undefined) {
      return;
    }

    const { provider } = currentProvider;

    function onChainChanged(newId: ProviderChainId) {
      setChainId(BigInt(newId));
    }

    provider.on('chainChanged', onChainChanged);

    // eslint-disable-next-line consistent-return
    return () => {
      // not all wallet providers implement removeListener
      try {
        provider.removeListener('chainChanged', onChainChanged);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };
  }, [currentProvider]);

  if (!chainId) {
    return <div>Loading...</div>;
  }

  return <div>Chain ID: {`${chainId}`}</div>;
}
