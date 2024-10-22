import { Web3PluginBase, utils } from "web3";
import { AddEthereumChainRequest } from "./types";

type WalletRpcApi = {
  wallet_addEthereumChain: (param: AddEthereumChainRequest) => null;
};

export class WalletRpcPlugin extends Web3PluginBase<WalletRpcApi> {
  public pluginNamespace = "walletRpc";

  public constructor() {
    super();
  }

  public async addEthereumChain(param: AddEthereumChainRequest): Promise<null> {
    return this.requestManager.send({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...param,
          chainId: utils.toHex(param.chainId),
        },
      ],
    });
  }
}

// Module Augmentation
declare module "web3" {
  interface Web3Context {
    walletRpc: WalletRpcPlugin;
  }
}
