import { useContext } from 'react';
import type { EIP6963ProviderDetail } from 'web3';

import type { IWeb3Context } from '../web3/Web3Context';
import { Web3Context } from '../web3/Web3Context';

export function ProviderButton({ provider }: { provider: EIP6963ProviderDetail }) {
  const web3Context: IWeb3Context = useContext(Web3Context);

  return (
    <button
      type="button"
      onClick={() => web3Context.setCurrentProvider(provider)}
      style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
    >
      <img src={provider.info.icon} alt={provider.info.name} width="35" height="35" />
      <span>{provider.info.name}</span>
    </button>
  );
}
