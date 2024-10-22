import { Web3PluginBase } from "web3";
import { AddEthereumChainParameter } from "./types";

type WalletRpcApi = {
  addEthereumChain: () => string;
  updateEthereumChain: () => string;
  switchEthereumChain: () => string;
  getOwnedAssets: () => string;
  watchAsset: () => string;
  requestPermissions: () => string;
  getPermissions: () => string;
};

export class WalletRpcPlugin extends Web3PluginBase<WalletRpcApi> {
  public pluginNamespace = "walletRpc";

  public constructor() {
    super();
  }

  public async addEthereumChain(
    param: AddEthereumChainParameter
  ): Promise<null> {
    // validate ?

    return this.requestManager.send({
      method: "wallet_addEthereumChain",
      params: [param], // encode?
    });
  }
}

// Module Augmentation
declare module "web3" {
  interface Web3Context {
    walletRpc: WalletRpcPlugin;
  }
}
