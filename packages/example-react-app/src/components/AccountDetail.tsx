import { type MutableRefObject, useContext, useEffect, useRef, useState } from 'react';

import { type IWeb3Context, Web3Context } from '../web3/Web3Context';

export function AccountDetail({ address }: { address: string }) {
  const web3Context: IWeb3Context = useContext(Web3Context);
  const [balance, setBalance] = useState<number>(NaN);
  const subscriptionId: MutableRefObject<string | undefined> = useRef(undefined);

  async function updateBalance(): Promise<void> {
    const newBalance = await web3Context.web3.eth.getBalance(address);

    setBalance(parseFloat(web3Context.web3.utils.fromWei(newBalance, 'ether')));
  }

  useEffect(() => {
    void updateBalance();
  }, []);

  useEffect(() => {
    if (web3Context.currentProvider === undefined) {
      return;
    }

    const { provider } = web3Context.currentProvider;

    function onChainChanged() {
      void updateBalance();
    }

    provider.on('chainChanged', onChainChanged);

    // eslint-disable-next-line consistent-return
    return () => {
      // not all wallet providers implement removeListener
      try {
        provider.removeListener('chainChanged', onChainChanged);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };
  }, [web3Context.currentProvider]);

  useEffect(() => {
    async function subscribeToNewBlockHeaders() {
      try {
        const newBlockSubscription =
          await web3Context.web3.eth.subscribe('newBlockHeaders');

        subscriptionId.current = newBlockSubscription.id;

        newBlockSubscription.on('data', () => {
          void updateBalance();
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }

    void subscribeToNewBlockHeaders();

    return () => {
      void web3Context.web3.eth.subscriptionManager.unsubscribe(
        ({ id }) => subscriptionId.current === id,
      );
    };
  });

  return (
    <>
      <div>{address}</div>
      <div>Balance in native token: {`${balance}`}</div>
    </>
  );
}
