import {
  type MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import type { NewHeadsSubscription } from "web3-eth";

import { type IWeb3Context, Web3Context } from "./web3/Web3Context";

function AccountDetail({ address }: { address: string }) {
  const web3Context: IWeb3Context = useContext(Web3Context);

  const [balance, setBalance] = useState<number>(NaN);
  const subscriptionId: MutableRefObject<string | undefined> =
    useRef(undefined);

  // update balance
  useEffect(() => {
    updateBalance();

    if (!web3Context.web3.subscriptionManager.supportsSubscriptions()) {
      return;
    }

    web3Context.web3.eth
      .subscribe("newBlockHeaders")
      .then((newBlockSubscription: NewHeadsSubscription) => {
        subscriptionId.current = newBlockSubscription.id;
        newBlockSubscription.on("data", () => {
          updateBalance();
        });
      });

    return () => {
      web3Context.web3.eth.subscriptionManager.unsubscribe(
        ({ id }) => subscriptionId.current === id
      );
    };
  });

  function updateBalance(): void {
    web3Context.web3.eth.getBalance(address).then((balance: bigint) => {
      setBalance(parseFloat(web3Context.web3.utils.fromWei(balance, "ether")));
    });
  }

  return (
    <>
      <div>{address}</div>
      <div>Balance in ether: {`${balance}`}</div>
    </>
  );
}

export default AccountDetail;
