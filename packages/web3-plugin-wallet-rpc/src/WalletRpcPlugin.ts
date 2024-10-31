import { Web3PluginBase } from 'web3-core';
import type { Numbers } from 'web3-types';
import { toHex } from 'web3-utils';
import { validator } from 'web3-validator';

import type {
  AddEthereumChainRequest,
  GetOwnedAssetsRequest,
  OwnedAsset,
  Permission,
  PermissionRequest,
  UpdateEthereumChainRequest,
  WatchAssetRequest,
} from './types';
import { parseToGetOwnedAssetsResult } from './utils';

type WalletRpcApi = {
  wallet_addEthereumChain: (param: AddEthereumChainRequest) => null;
  wallet_switchEthereumChain: (chainId: Numbers) => null;
  wallet_watchAsset: (param: WatchAssetRequest) => boolean;
  wallet_requestPermissions: (param: PermissionRequest) => Permission[];
  wallet_getPermissions: () => Permission[];
  wallet_revokePermissions: (param: PermissionRequest) => null;
  // experimental
  wallet_getOwnedAssets: (param: GetOwnedAssetsRequest) => OwnedAsset[];
  wallet_updateEthereumChain: (param: UpdateEthereumChainRequest) => void;
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
  public pluginNamespace = 'walletRpc';

  public constructor() {
    super();
  }

  /**
   * Request to add a new chain to the user's wallet.
   *
   * See [EIP-3085](https://eips.ethereum.org/EIPS/eip-3085) for more details.
   *
   * @param param - Details of the chain to add.
   * @returns A Promise that resolves if the request is successful.
   *
   * @example
   * await web3.walletRpc.addEthereumChain({
   *   chainId: 5000,
   *   blockExplorerUrls: ["https://mantlescan.xyz"],
   *   chainName: "Mantle",
   *   iconUrls: ["https://icons.llamao.fi/icons/chains/rsz_mantle.jpg"],
   *   nativeCurrency: {
   *     name: "Mantle",
   *     symbol: "MNT",
   *     decimals: 18,
   *   },
   *   rpcUrls: ["https://rpc.mantle.xyz"],
   * });
   */
  public async addEthereumChain(param: AddEthereumChainRequest): Promise<null> {
    return this.requestManager.send({
      method: 'wallet_addEthereumChain',
      params: [
        {
          ...param,
          chainId: toHex(param.chainId),
        },
      ],
    });
  }

  /**
   * Switch to a new chain and register it with the user’s wallet if it isn’t already recognized.
   *
   * See [EIP-2015](https://eips.ethereum.org/EIPS/eip-2015) for more details.
   *
   * @param param - Details of the chain to switch to and possibly add.
   * @returns A Promise that resolves if the request is successful.
   * @experimental
   */
  public async updateEthereumChain(param: UpdateEthereumChainRequest): Promise<void> {
    return this.requestManager.send({
      method: 'wallet_updateEthereumChain',
      params: [
        {
          ...param,
          chainId: toHex(param.chainId),
        },
      ],
    });
  }

  /**
   * Switch the wallet's currently active chain.
   *
   * If the specified chain does not exist in the wallet, an error will be thrown.
   * To prevent errors, ensure the chain has been added first or handle the call within a try/catch block.
   *
   * See [EIP-3326](https://eips.ethereum.org/EIPS/eip-3326) for more details.
   *
   * @param chainId - The ID of the chain to switch to.
   * @returns A Promise that resolves if the chain switch is successful.
   *
   * @example
   * await web3.walletRpc.switchEthereumChain(5000);
   */
  public async switchEthereumChain(chainId: Numbers): Promise<null> {
    return this.requestManager.send({
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId: toHex(chainId),
        },
      ],
    });
  }

  /**
   * Return a list of owned assets for the given address.
   *
   * See [EIP-2256](https://eips.ethereum.org/EIPS/eip-2256) for more details.
   *
   * @param param - Details of the request for owned assets.
   * @returns A Promise that resolves to a list of owned assets.
   * @experimental
   */
  public async getOwnedAssets(param: GetOwnedAssetsRequest): Promise<OwnedAsset[]> {
    validator.validate(['address'], [param.address]);

    const trueParam = { ...param };
    if (trueParam.options?.chainId) {
      trueParam.options.chainId = toHex(trueParam.options.chainId);
    }

    const result = await this.requestManager.send({
      method: 'wallet_getOwnedAssets',
      params: [trueParam],
    });

    return parseToGetOwnedAssetsResult(result);
  }

  /**
   * Add an asset to the user's wallet.
   *
   * See [EIP-747](https://eips.ethereum.org/EIPS/eip-747) for more details.
   *
   * @param param - Details of the asset to watch.
   * @returns A Promise that resolves to `true` if the request is successful.
   *
   * @example
   * await web3.walletRpc.watchAsset({
   *   type: "ERC20",
   *   options: {
   *     address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
   *     symbol: "USDC",
   *   },
   * });
   */
  public async watchAsset(param: WatchAssetRequest): Promise<boolean> {
    return this.requestManager.send({
      method: 'wallet_watchAsset',
      params: [param],
    });
  }

  /**
   * Request permissions for a dApp.
   *
   * See [EIP-2255](https://eips.ethereum.org/EIPS/eip-2255) for more details.
   *
   * @param param - Details of the permission request.
   * @returns A Promise that resolves to an array of granted permissions.
   *
   * @example
   * const permissions = await web3.walletRpc.requestPermissions({
   *   eth_accounts: {}
   * });
   */
  public async requestPermissions(param: PermissionRequest): Promise<Permission[]> {
    return this.requestManager.send({
      method: 'wallet_requestPermissions',
      params: [param],
    });
  }

  /**
   * Retrieve the list of permissions granted to the dApp.
   *
   * See [EIP-2255](https://eips.ethereum.org/EIPS/eip-2255) for more details.
   *
   * @returns A Promise that resolves to an array of granted permissions.
   *
   * @example
   * const permissions = await web3.walletRpc.getPermissions();
   */
  public async getPermissions(): Promise<Permission[]> {
    return this.requestManager.send({
      method: 'wallet_getPermissions',
      params: [],
    });
  }

  /**
   * Revoke permissions granted to the dApp.
   *
   * @param param - Details of the permissions to revoke.
   * @returns A Promise that resolves if the request is successful.
   *
   * @example
   * await web3.walletRpc.revokePermissions({
   *   eth_accounts: {}
   * });
   */
  public async revokePermissions(param: PermissionRequest): Promise<null> {
    return this.requestManager.send({
      method: 'wallet_revokePermissions',
      params: [param],
    });
  }
}

declare module 'web3' {
  interface Web3Context {
    walletRpc: WalletRpcPlugin;
  }
}
