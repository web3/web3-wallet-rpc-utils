import { Web3PluginBase, utils, validator } from "web3";
import {
  AddEthereumChainRequest,
  GetOwnedAssetsRequest,
  GetOwnedAssetsResult,
  SwitchEthereumChainRequest,
  UpdateEthereumChainRequest,
} from "./types";

type WalletRpcApi = {
  wallet_addEthereumChain: (param: AddEthereumChainRequest) => void;
  wallet_updateEthereumChain: (param: UpdateEthereumChainRequest) => void;
  wallet_switchEthereumChain: (param: SwitchEthereumChainRequest) => void;
  wallet_getOwnedAssets: (param: GetOwnedAssetsRequest) => GetOwnedAssetsResult;
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
   * @param param - See {@link AddEthereumChainRequest}
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
   * @param param - See {@link UpdateEthereumChainRequest}
   * @returns a Promise that resolves if the request is successful
   */
  public async updateEthereumChain(
    param: UpdateEthereumChainRequest
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
   * @param param - See {@link SwitchEthereumChainRequest}
   * @returns a Promise that resolves if the request is successful
   */
  public async switchEthereumChain(
    param: SwitchEthereumChainRequest
  ): Promise<void> {
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

  /**
   * Return a list of owned assets for the given address.
   *
   * See [EIP-2256](https://eips.ethereum.org/EIPS/eip-2256) for more details.
   *
   * @param param - See {@link GetOwnedAssetsRequest}
   * @returns a Promise that resolves to a list of owned assets, see {@link GetOwnedAssetsResult}
   */
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
