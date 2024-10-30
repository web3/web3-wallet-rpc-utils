import type { Address, Numbers } from 'web3';

export type NativeCurrencyData = {
  /**
   * The name of the native currency (e.g., "Ether" for Ethereum).
   */
  name: string;

  /**
   * The currency symbol (e.g., "ETH" for Ethereum).
   */
  symbol: string;

  /**
   * The number of decimal places used by the currency.
   */
  decimals: number;
};

/**
 * Request to add a new blockchain network to the user's wallet.
 *
 * See [EIP-3085](https://eips.ethereum.org/EIPS/eip-3085) for more details.
 */
export type AddEthereumChainRequest = {
  /**
   * Unique identifier for the chain, as per EIP-155.
   */
  chainId: Numbers;

  /**
   * URLs for block explorers associated with this chain.
   */
  blockExplorerUrls?: string[];

  /**
   * The name of the chain (e.g., "Ethereum Mainnet").
   */
  chainName?: string;

  /**
   * URLs to icons representing the chain.
   */
  iconUrls?: string[];

  /**
   * Details of the native currency used on this chain.
   */
  nativeCurrency?: NativeCurrencyData;

  /**
   * URLs of the RPC nodes for this chain.
   */
  rpcUrls?: string[];
};

/**
 * Request to switch to a specified blockchain network. Registers the network if it’s not recognized by the wallet.
 *
 * See [EIP-2015](https://eips.ethereum.org/EIPS/eip-2015) for more details.
 */
export type UpdateEthereumChainRequest = {
  /**
   * Unique identifier for the chain, as per EIP-155.
   */
  chainId: Numbers;

  /**
   * URL for the primary block explorer of this chain.
   */
  blockExplorerUrl?: string;

  /**
   * The name of the chain.
   */
  chainName?: string;

  /**
   * Details of the native currency used on this chain.
   */
  nativeCurrency?: NativeCurrencyData;

  /**
   * URLs of the RPC nodes for this chain.
   */
  rpcUrls?: string[];
};

/**
 * Request to retrieve a list of assets owned by a specified Ethereum address.
 *
 * See [EIP-2256](https://eips.ethereum.org/EIPS/eip-2256) for more details.
 */
export type GetOwnedAssetsRequest = {
  /**
   * Ethereum address of the asset owner.
   */
  address: Address;

  options?: {
    /**
     * Chain ID as per EIP-155, specifying the blockchain.
     */
    chainId?: Numbers;

    /**
     * Maximum number of assets to return.
     */
    limit?: number;

    /**
     * List of asset types (e.g., ['ERC20', 'ERC721']) to filter the response.
     */
    types?: string[];

    /**
     * Description of the purpose of this request, provided by the dApp.
     */
    justification?: string;
  };
};

/**
 * Representation of a single asset owned by the user’s wallet.
 *
 * See [EIP-2256](https://eips.ethereum.org/EIPS/eip-2256) for more details.
 */
export type OwnedAsset = {
  /**
   * Checksummed Ethereum address of the asset contract.
   */
  address: Address;

  /**
   * Identifier for the chain where this asset is deployed.
   */
  chainId: Numbers;

  /**
   * Identifier of the asset type (e.g., "ERC20").
   */
  type?: string;

  /**
   * Asset-specific metadata.
   */
  options: {
    /**
     * Name of the token. Optional if the token contract doesn’t implement it.
     */
    name?: string;

    /**
     * Symbol of the token. Optional if the token contract doesn’t implement it.
     */
    symbol?: string;

    /**
     * Token icon in base64 format or URL. Optional.
     */
    icon?: string;

    /**
     * Number of tokens owned, in the smallest denomination.
     */
    balance: Numbers;

    /**
     * Number of decimal places supported by the token. Optional.
     */
    decimals?: number;
  };
};

/**
 * Request to add a specified asset to the user’s wallet interface.
 *
 * See [EIP-747](https://eips.ethereum.org/EIPS/eip-747) for more details.
 */
export type WatchAssetRequest = {
  /**
   * Identifier for the token type (e.g., ERC20, ERC721, or ERC1155).
   */
  type: string;

  /**
   * Asset-specific configuration details.
   */
  options: {
    /**
     * Ethereum address of the token contract.
     */
    address: Address;

    /**
     * Symbol of the token (e.g., "ETH", "USDC").
     */
    symbol?: string;

    /**
     * Number of decimals used by the token.
     */
    decimals?: number;

    /**
     * URL or base64-encoded image of the token.
     */
    image?: string;
  };
};

/**
 * Defines a request to grant or revoke permissions.
 *
 * See [EIP-2255](https://eips.ethereum.org/EIPS/eip-2255) for more details.
 */
export type PermissionRequest = Record<string, unknown>;

/**
 * Specifies restrictions applied to a permitted method.
 *
 * See [EIP-2255](https://eips.ethereum.org/EIPS/eip-2255) for more details.
 */
export type Caveat = {
  /**
   * Type of restriction.
   */
  type: string;

  /**
   * Value associated with this restriction, as JSON. Its meaning is context-dependent based on the caveat type.
   */
  value: unknown;
};

/**
 * Defines a permission granted to a dApp by the user.
 *
 * See [EIP-2255](https://eips.ethereum.org/EIPS/eip-2255) for more details.
 */
export type Permission = {
  /**
   * Unique identifier for the permission.
   */
  id?: string;

  /**
   * URI of the dApp granted this permission.
   */
  invoker?: string;

  /**
   * Method permitted by this permission (e.g., "eth_accounts").
   */
  parentCapability: string;

  /**
   * List of restrictions applied to this permission.
   */
  caveats?: Caveat[];

  /**
   * Date of the permission request, in Unix timestamp format.
   */
  date?: number;
};
