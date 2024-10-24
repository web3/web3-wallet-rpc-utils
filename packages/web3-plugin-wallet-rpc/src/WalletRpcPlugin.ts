import type { Numbers } from "web3";
import { Web3PluginBase, utils, validator } from "web3";

import type {
  AddEthereumChainRequest,
  GetOwnedAssetsRequest,
  OwnedAsset,
  UpdateEthereumChainRequest,
  WatchAssetRequest,
} from "./types";
import { parseToGetOwnedAssetsResult } from "./utils";

type WalletRpcApi = {
  wallet_addEthereumChain: (param: AddEthereumChainRequest) => void;
  wallet_updateEthereumChain: (param: UpdateEthereumChainRequest) => void;
  wallet_switchEthereumChain: (chainId: Numbers) => void;
  wallet_getOwnedAssets: (param: GetOwnedAssetsRequest) => OwnedAsset[];
  wallet_watchAsset: (param: WatchAssetRequest) => boolean;
};

/**
 * This Web3.js plugin adds support for various wallet-related RPC methods.
 *
 * @example
 * Initialize the plugin
 *
 * ```typescript
 * import { Web3 } from "web3";
 * import { WalletRpcPlugin } from "web3-plugin-wallet-rpc";
 *
 * const web3 = new Web3("https://eth.llamarpc.com");
 * web3.registerPlugin(new WalletRpcPlugin());
 * ```
 */
export class WalletRpcPlugin extends Web3PluginBase<WalletRpcApi> {
  public pluginNamespace = "walletRpc";

  public constructor() {
    super();
  }

  /**
   * Request to add a new chain to the user's wallet.
   *
   * See [EIP-3085](https://eips.ethereum.org/EIPS/eip-3085) for more details.
   *
   * @param param - Details of the chain to add
   * @returns a Promise that resolves if the request is successful
   */
  public async addEthereumChain(param: AddEthereumChainRequest): Promise<void> {
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

  /**
   * Switch to a new chain and register it with the user’s wallet if it isn’t already recognized.
   *
   * See [EIP-2015](https://eips.ethereum.org/EIPS/eip-2015) for more details.
   *
   * @param param - Details of the chain to switch to and possibly add
   * @returns a Promise that resolves if the request is successful
   */
  public async updateEthereumChain(
    param: UpdateEthereumChainRequest,
  ): Promise<void> {
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

  /**
   * Switch the wallet’s currently active chain.
   *
   * See [EIP-3326](https://eips.ethereum.org/EIPS/eip-3326) for more details.
   *
   * @param chainId - Chain ID of the chain to switch to
   * @returns a Promise that resolves if the request is successful
   */
  public async switchEthereumChain(chainId: Numbers): Promise<void> {
    return this.requestManager.send({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: utils.toHex(chainId),
        },
      ],
    });
  }

  /**
   * Return a list of owned assets for the given address.
   *
   * See [EIP-2256](https://eips.ethereum.org/EIPS/eip-2256) for more details.
   *
   * @param param - Details of the request for owned assets
   * @returns a Promise that resolves to a list of owned assets
   */
  public async getOwnedAssets(
    param: GetOwnedAssetsRequest,
  ): Promise<OwnedAsset[]> {
    validator.validator.validate(["address"], [param.address]);

    const trueParam = { ...param };
    if (trueParam.options?.chainId) {
      trueParam.options.chainId = utils.toHex(trueParam.options.chainId);
    }

    const result = await this.requestManager.send({
      method: "wallet_getOwnedAssets",
      params: [trueParam],
    });

    return parseToGetOwnedAssetsResult(result);
  }

  /**
   * Add an asset to the user's wallet.
   *
   * See [EIP-747](https://eips.ethereum.org/EIPS/eip-747) for more details.
   *
   * @param param - Details of the asset to watch
   * @returns a Promise that resolves to `true` if the request is successful
   */
  public async watchAsset(param: WatchAssetRequest): Promise<boolean> {
    return this.requestManager.send({
      method: "wallet_watchAsset",
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
