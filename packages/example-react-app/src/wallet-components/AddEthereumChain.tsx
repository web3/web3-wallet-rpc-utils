import { useContext, useState } from 'react';
import type { AddEthereumChainRequest } from 'web3-plugin-wallet-rpc';

import { Web3Context } from '../web3/Web3Context';

const chains: Record<string, AddEthereumChainRequest> = {
  polygon: {
    chainId: 137,
    blockExplorerUrls: ['https://polygonscan.com'],
    chainName: 'Polygon',
    iconUrls: ['https://icons.llamao.fi/icons/chains/rsz_polygon.jpg'],
    nativeCurrency: {
      name: 'Polygon',
      symbol: 'POL',
      decimals: 18,
    },
    rpcUrls: ['https://polygon.llamarpc.com'],
  },
  mantle: {
    chainId: 5000,
    blockExplorerUrls: ['https://mantlescan.xyz'],
    chainName: 'Mantle',
    iconUrls: ['https://icons.llamao.fi/icons/chains/rsz_mantle.jpg'],
    nativeCurrency: {
      name: 'Mantle',
      symbol: 'MNT',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.mantle.xyz'],
  },
  scroll: {
    chainId: 534352,
    blockExplorerUrls: ['https://scrollscan.com'],
    chainName: 'Scroll',
    iconUrls: ['https://icons.llamao.fi/icons/chains/rsz_scroll.jpg'],
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.scroll.io'],
  },
};

function AddChainButton({ chainDetails }: { chainDetails: AddEthereumChainRequest }) {
  const { web3 } = useContext(Web3Context);
  const [error, setError] = useState<Error | undefined>(undefined);

  const handleClick = () => {
    web3.walletRpc
      .addEthereumChain(chainDetails)
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(
          `Successfully added chain ${chainDetails.chainId} with response`,
          response,
        );
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);

        if (e instanceof Error) {
          setError(e);
        }
      });
  };

  return (
    <>
      <button type="button" onClick={handleClick}>
        {`Add new chain: ${chainDetails.chainName ?? ''} (${chainDetails.chainId})`}
      </button>
      {error && <div>{error.message}</div>}
    </>
  );
}

export function AddEthereumChain() {
  return (
    <div>
      <h4>Add EVM Chain</h4>
      <AddChainButton chainDetails={chains.polygon} />
      <AddChainButton chainDetails={chains.mantle} />
      <AddChainButton chainDetails={chains.scroll} />
    </div>
  );
}
