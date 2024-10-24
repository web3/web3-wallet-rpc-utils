import { useContext } from "react";
import { Web3Context } from "./web3/Web3Context";

function WalletRpcPlugComponent() {
  const { web3 } = useContext(Web3Context);

  return (
    <div>
      <button onClick={() => web3.walletRpc.switchEthereumChain(137)}>
        Switch chain to 137
      </button>
      <button onClick={() => web3.walletRpc.switchEthereumChain(1)}>
        Switch chain to 1
      </button>
    </div>
  );
}

export default WalletRpcPlugComponent;
