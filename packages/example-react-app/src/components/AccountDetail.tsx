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
    async function subscribeToNewBlockHeaders() {
      const newBlockSubscription =
        await web3Context.web3.eth.subscribe('newBlockHeaders');

      subscriptionId.current = newBlockSubscription.id;

      newBlockSubscription.on('data', () => {
        void updateBalance();
      });
    }

    void subscribeToNewBlockHeaders();

    return () => {
      void web3Context.web3.eth.subscriptionManager.unsubscribe(
        ({ id }) => subscriptionId.current === id,
      );
    };
  }, []);

  return (
    <>
      <div>{address}</div>
      <div>Balance in native token: {`${balance}`}</div>
    </>
  );
}
