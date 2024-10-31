import { useContext, useState } from 'react';
import type { WatchAssetRequest } from 'web3-plugin-wallet-rpc';

import { Web3Context } from '../web3/Web3Context';

const tokens: Record<string, WatchAssetRequest> = {
  usdc: {
    type: 'ERC20',
    options: {
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      symbol: 'USDC',
    },
  },
  scroll: {
    type: 'ERC20',
    options: {
      address: '0xd29687c813D741E2F938F4aC377128810E217b1b',
      symbol: 'SCR',
    },
  },
};

function WatchAssetButton({
  asset,
  description,
}: {
  asset: WatchAssetRequest;
  description?: string;
}) {
  const { web3 } = useContext(Web3Context);
  const [error, setError] = useState<Error | undefined>(undefined);

  const handleClick = () => {
    web3.walletRpc
      .watchAsset(asset)
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(
          `Successfully added ${asset.options.symbol ?? ''} with response`,
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
        Add {asset.options.symbol} {description}
      </button>
      {error && <div>{error.message}</div>}
    </>
  );
}

export function WatchAsset() {
  return (
    <div>
      <h4>Add token to wallet&apos;s list</h4>
      <WatchAssetButton asset={tokens.usdc} />
      <WatchAssetButton asset={tokens.scroll} description="(Only on Scroll Network)" />
    </div>
  );
}
