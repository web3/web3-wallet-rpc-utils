import { useContext, useState } from 'react';

import { Web3Context } from '../web3/Web3Context';

function SwitchChainButton({ chainId }: { chainId: number }) {
  const { web3 } = useContext(Web3Context);
  const [error, setError] = useState<Error | undefined>(undefined);

  const handleClick = () => {
    web3.walletRpc
      .switchEthereumChain(chainId)
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(`Successfully switched to chain ${chainId} with response`, response);
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
        Switch to chain {chainId}
      </button>
      {error && <div>{error.message}</div>}
    </>
  );
}

export function SwitchEthereumChain() {
  return (
    <div>
      <h4>Switch Chain (must be known by the wallet)</h4>
      <SwitchChainButton chainId={137} />
      <SwitchChainButton chainId={1} />
      <SwitchChainButton chainId={5000} />
    </div>
  );
}
