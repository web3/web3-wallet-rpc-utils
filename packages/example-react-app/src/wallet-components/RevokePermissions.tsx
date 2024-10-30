import { useContext, useState } from 'react';

import { Web3Context } from '../web3/Web3Context';

export function RevokePermissions() {
  const { web3 } = useContext(Web3Context);
  const [error, setError] = useState<Error | undefined>(undefined);

  const handleClick = () => {
    web3.walletRpc
      .revokePermissions({
        eth_accounts: {},
      })
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log('Successfully revoked permissions with response', response);
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
        Revoke permissions
      </button>
      {error && <div>{error.message}</div>}
    </>
  );
}
