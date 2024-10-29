import { useContext, useState } from 'react';
import { Permission } from 'web3-plugin-wallet-rpc';
import { Web3Context } from '../web3/Web3Context';

export function RequestPermissions() {
  const { web3 } = useContext(Web3Context);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [permissions, setPermissions] = useState<Permission[] | undefined>(undefined);

  const handleClick = () => {
    web3.walletRpc
      .requestPermissions({
        eth_accounts: {},
      })
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(`Successfully requested permissions with response`, response);

        setPermissions(response);
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
        Request permissions
      </button>
      {permissions && <pre>{JSON.stringify(permissions, null, 2)}</pre>}
      {error && <div>{error.message}</div>}
    </>
  );
}
