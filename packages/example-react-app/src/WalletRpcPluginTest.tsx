import { useContext } from "react";
import { IWeb3Context, Web3Context } from "./web3/Web3Context";

function WalletRpcPluginTest() {
  const web3Context: IWeb3Context = useContext(Web3Context);

  return (
    <div>
      <button
        onClick={() =>
          web3Context.web3.walletRpc.switchEthereumChain({ chainId: 137 })
        }
      >
        Switch chain to 137
      </button>
      <button
        onClick={() =>
          web3Context.web3.walletRpc.switchEthereumChain({ chainId: 1 })
        }
      >
        Switch chain to 1
      </button>
    </div>
  );
}

export default WalletRpcPluginTest;
