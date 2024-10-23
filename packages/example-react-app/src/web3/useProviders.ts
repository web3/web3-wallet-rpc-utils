import { useSyncExternalStore } from 'react';
import type {
  EIP6963ProviderDetail,
  EIP6963ProviderResponse,
  EIP6963ProvidersMapUpdateEvent,
} from 'web3';
import { Web3, web3ProvidersMapUpdated } from 'web3';

let providerList: EIP6963ProviderDetail[] = [];

/**
 * External store for subscribing to EIP-6963 providers
 * https://metamask.io/news/developers/how-to-implement-eip-6963-support-in-your-web-3-dapp/
 */
const providerStore = {
  getSnapshot: () => providerList,
  subscribe: (callback: () => void) => {
    function setProviders(response: EIP6963ProviderResponse): void {
      providerList = [];

      response.forEach((provider) => {
        providerList.push(provider);
      });

      callback();
    }

    Web3.requestEIP6963Providers()
      .then(setProviders)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });

    function updateProviders(providerEvent: EIP6963ProvidersMapUpdateEvent) {
      setProviders(providerEvent.detail);
    }

    Web3.onNewProviderDiscovered(updateProviders);

    return () => {
      window.removeEventListener(web3ProvidersMapUpdated as any, updateProviders);
    };
  },
};

export const useProviders = () =>
  useSyncExternalStore(providerStore.subscribe, providerStore.getSnapshot);
