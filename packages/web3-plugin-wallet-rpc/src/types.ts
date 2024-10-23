import type { Address, Numbers } from "web3";

export type NativeCurrencyData = {
  name: string;
  symbol: string;
  decimals: number;
};

/**
 * Request to add a new chain to the user's wallet.
 *
 * See [EIP-3085](https://eips.ethereum.org/EIPS/eip-3085) for more details.
 */
export type AddEthereumChainRequest = {
  chainId: Numbers;
  blockExplorerUrls?: string[];
  chainName?: string;
  iconUrls?: string[];
  nativeCurrency?: NativeCurrencyData;
  rpcUrls?: string[];
};

/**
 * Request to switch to a new chain and register it with the user’s wallet if it isn’t already recognized.
 *
 * See [EIP-2015](https://eips.ethereum.org/EIPS/eip-2015) for more details.
 */
export type UpdateEthereumChainRequest = {
  chainId: Numbers;
  blockExplorerUrl?: string;
  chainName?: string;
  nativeCurrency?: NativeCurrencyData;
  rpcUrls?: string[];
};

/**
 * Request to return a list of owned assets for the given address.
 *
 * See [EIP-2256](https://eips.ethereum.org/EIPS/eip-2256) for more details.
 */
export type GetOwnedAssetsRequest = {
  /**
   * Ethereum address that owns the assets.
   */
  address: Address;
  options?: {
    /**
     * Chain ID respecting EIP-155.
     */
    chainId?: Numbers;
    /**
     * Maximum number of owned assets expected by the dApp to be returned.
     */
    limit?: number;
    /**
     * Array of asset interface identifiers such as ['ERC20', 'ERC721'].
     */
    types?: string[];
    /**
     * Human-readable text provided by the dApp, explaining the intended purpose of this request.
     */
    justification?: string;
  };
};

/**
 * A single asset owned by the wallet user.
 *
 * See [EIP-2256](https://eips.ethereum.org/EIPS/eip-2256) for more details.
 */
export type OwnedAsset = {
  /**
   * Ethereum checksummed address of the asset.
   */
  address: Address;
  /**
   * Identifier for the chain on which the assets are deployed.
   */
  chainId: Numbers;
  /**
   * The token interface identifier, e.g., ERC20
   */
  type?: string;
  /**
   * Asset-specific fields.
   */
  options: {
    /**
     * Token name. Optional if the token does not implement it.
     */
    name?: string;
    /**
     * Token symbol. Optional if the token does not implement it.
     */
    symbol?: string;
    /**
     * Token icon in base64 format. Optional.
     */
    icon?: string;
    /**
     * The number of tokens that the user owns, in the smallest token denomination.
     */
    balance: Numbers;
    /**
     * The number of decimals implemented by the token. Optional.
     */
    decimals?: number;
  };
};

/**
 * Request to add a new asset to the user’s wallet.
 *
 * See [EIP-747](https://eips.ethereum.org/EIPS/eip-747) for more details.
 */
export type WatchAssetRequest = {
  /**
   * The token interface identifier, e.g., ERC20, ERC721, or ERC1155.
   * This depends on the types of tokens supported by the wallet.
   */
  type: string;
  /**
   * Configuration options for the specified token type.
   */
  options: {
    /**
     * The Ethereum address of the token contract.
     */
    address: Address;
    /**
     * The token symbol, such as "ETH" for Ethereum or "USDC" for USD Coin.
     */
    symbol?: string;
    /**
     * The number of decimals the token uses. For example, 18 for ETH and most ERC20 tokens.
     */
    decimals?: number;
    /**
     * A URL to an image representing the token (often in base64 or hosted format).
     */
    image?: string;
  };
};
