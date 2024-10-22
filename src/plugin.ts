import { Web3PluginBase } from "web3";
import {
  AddEthereumChainRequest,
  GetOwnedAssetsRequest,
  GetOwnedAssetsResult,
  SwitchEthereumChainRequest,
  UpdateEthereumChainRequest,
} from "./types";

// is this in use?
type WalletRpcApi = {
  addEthereumChain: () => Promise<null>;
  updateEthereumChain: () => Promise<boolean>;
  switchEthereumChain: () => Promise<null>;
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

  public async addEthereumChain(param: AddEthereumChainRequest): Promise<null> {
    // validate ?

    return this.requestManager.send({
      method: "wallet_addEthereumChain",
      params: [param], // encode?
    });
  }

  public async updateEthereumChain(
    param: UpdateEthereumChainRequest
  ): Promise<boolean> {
    // validate ?

    return this.requestManager.send({
      method: "wallet_updateEthereumChain",
      params: [param], // encode?
    });
  }

  public async switchEthereumChain(
    param: SwitchEthereumChainRequest
  ): Promise<null> {
    // validate ?

    return this.requestManager.send({
      method: "wallet_switchEthereumChain",
      params: [param], // encode?
    });
  }

  public async getOwnedAssets(
    param: GetOwnedAssetsRequest
  ): Promise<GetOwnedAssetsResult> {
    // validate ?

    return this.requestManager.send({
      method: "wallet_getOwnedAssets",
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
