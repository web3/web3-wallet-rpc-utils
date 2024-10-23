import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { type IWeb3Context, Web3Context } from './Web3Context';

export type IAccountContext = {
  accounts: string[];
  selectedAccount: string | undefined;
  requestAccounts: () => void;
};

const defaultContext: IAccountContext = {
  accounts: [],
  selectedAccount: undefined,
  requestAccounts: () => null,
};

export const AccountContext = createContext<IAccountContext>(defaultContext);

/**
 * React component that provides a context for managing and interacting with Web3 accounts
 * @param children components that may require Web3 account
 * @returns React component that provides a context for managing and interacting with Web3 accounts
 */
export function AccountProvider({ children }: { children: ReactNode }) {
  const web3Context: IWeb3Context = useContext(Web3Context);

  const [accounts, setAccounts] = useState<string[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string | undefined>();

  // update list of accounts
  useEffect(() => {
    const provider = web3Context.currentProvider;
    if (provider === undefined) {
      return;
    }

    web3Context.web3.eth
      .getAccounts()
      .then(setAccounts)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });

    provider.provider.on('accountsChanged', setAccounts);

    // eslint-disable-next-line consistent-return
    return () => {
      provider.provider.removeListener('accountsChanged', setAccounts);
    };
  }, [web3Context.currentProvider, web3Context.web3.eth]);

  // update selected account
  useEffect(() => {
    if (accounts.length === 0) {
      setSelectedAccount(undefined);
    } else {
      setSelectedAccount(accounts[0]);
    }
  }, [accounts]);

  function requestAccounts() {
    web3Context.web3.eth
      .requestAccounts()
      .then(setAccounts)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }

  const accountContext: IAccountContext = useMemo(
    () => ({
      accounts,
      selectedAccount,
      requestAccounts,
    }),
    [accounts, selectedAccount, requestAccounts],
  );

  return (
    <AccountContext.Provider value={accountContext}>{children}</AccountContext.Provider>
  );
}
