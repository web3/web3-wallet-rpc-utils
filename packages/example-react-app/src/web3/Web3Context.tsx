import {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { providers, Web3 } from "web3";
import { WalletRpcPlugin } from "web3-plugin-wallet-rpc";
import { useProviders } from "./useProviders";

export interface IWeb3Context {
  web3: Web3;
  providers: providers.EIP6963ProviderDetail[];
  currentProvider: providers.EIP6963ProviderDetail | undefined;
  setCurrentProvider: (provider: providers.EIP6963ProviderDetail) => void;
}

const defaultContext: IWeb3Context = {
  web3: new Web3(),
  providers: [],
  currentProvider: undefined,
  setCurrentProvider: function (
    provider: providers.EIP6963ProviderDetail
  ): void {
    this.web3.setProvider(provider.provider);
    this.currentProvider = provider;
  },
};

export const Web3Context = createContext<IWeb3Context>(defaultContext);

/**
 * React component that provides a context for interacting with a shared, managed instance of Web3.js
 * @param children components that may require access to an instance of Web3.js
 * @returns React component that provides a context for interacting with a shared, managed instance of Web3.js
 */
export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const web3: Web3 = useMemo(() => {
    const web3 = new Web3();
    web3.registerPlugin(new WalletRpcPlugin());
    return web3;
  }, []);
  const providers: providers.EIP6963ProviderDetail[] = useProviders();

  const [currentProvider, _setCurrentProvider] = useState<
    providers.EIP6963ProviderDetail | undefined
  >(undefined);

  const setCurrentProvider = useCallback(
    (provider: providers.EIP6963ProviderDetail) => {
      web3.setProvider(provider.provider);
      localStorage.setItem("provider", provider.info.rdns);
      _setCurrentProvider(provider);
    },
    [web3]
  );

  // update provider with cached value from local storage on page load
  useEffect(() => {
    if (currentProvider !== undefined) {
      return;
    }

    const cachedProvider: string | null = localStorage.getItem("provider");
    if (cachedProvider === null) {
      return;
    }

    const targetProvider: providers.EIP6963ProviderDetail | undefined =
      providers.find(
        (provider: providers.EIP6963ProviderDetail) =>
          provider.info.rdns === cachedProvider
      );

    if (targetProvider !== undefined) {
      setCurrentProvider(targetProvider);
    }
  }, [currentProvider, providers, setCurrentProvider]);

  const web3Context: IWeb3Context = {
    web3,
    providers,
    currentProvider,
    setCurrentProvider,
  };

  return (
    <Web3Context.Provider value={web3Context}>{children}</Web3Context.Provider>
  );
};
