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
