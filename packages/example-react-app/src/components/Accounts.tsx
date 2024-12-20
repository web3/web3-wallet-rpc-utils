import { useContext } from 'react';

import { AccountContext, type IAccountContext } from '../web3/AccountContext';

import { AccountDetail } from './AccountDetail';

export function Accounts() {
  const accountContext: IAccountContext = useContext(AccountContext);

  return (
    <>
      <h2>Accounts</h2>
      <div>
        {accountContext.selectedAccount === undefined ? (
          <button type="button" onClick={accountContext.requestAccounts}>
            Connect Accounts
          </button>
        ) : (
          <>
            <h3>Selected Account</h3>
            <AccountDetail address={accountContext.selectedAccount} />
            {accountContext.accounts.length > 1 ? (
              <>
                <h3>Other Accounts</h3>
                {accountContext.accounts.slice(1).map((account: string) => (
                  <AccountDetail address={account} key={account} />
                ))}
              </>
            ) : null}
          </>
        )}
      </div>
    </>
  );
}
