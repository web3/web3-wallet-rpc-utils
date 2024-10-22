import { Web3PluginBase, utils, validator } from "web3";
import {
  AddEthereumChainRequest,
  GetOwnedAssetsRequest,
  GetOwnedAssetsResult,
  SwitchEthereumChainRequest,
  UpdateEthereumChainRequest,
} from "./types";

type WalletRpcApi = {
  wallet_addEthereumChain: (param: AddEthereumChainRequest) => null;
  wallet_updateEthereumChain: (param: UpdateEthereumChainRequest) => null;
  wallet_switchEthereumChain: (param: SwitchEthereumChainRequest) => null;
  wallet_getOwnedAssets: (param: GetOwnedAssetsRequest) => GetOwnedAssetsResult;
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

  public async updateEthereumChain(
    param: UpdateEthereumChainRequest
  ): Promise<boolean> {
    return this.requestManager.send({
      method: "wallet_updateEthereumChain",
      params: [
        {
          ...param,
          chainId: utils.toHex(param.chainId),
        },
      ],
    });
  }

  public async switchEthereumChain(
    param: SwitchEthereumChainRequest
  ): Promise<null> {
    return this.requestManager.send({
      method: "wallet_switchEthereumChain",
      params: [
        {
          ...param,
          chainId: utils.toHex(param.chainId),
        },
      ],
    });
  }

  public async getOwnedAssets(
    param: GetOwnedAssetsRequest
  ): Promise<GetOwnedAssetsResult> {
    validator.validator.validate(["address"], [param.address]);

    // TODO: transform optional chainId to hex

    return this.requestManager.send({
      method: "wallet_getOwnedAssets",
      params: [param],
    });
  }
}

// Module Augmentation
declare module "web3" {
  interface Web3Context {
    walletRpc: WalletRpcPlugin;
  }
}
