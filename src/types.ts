import { Address, Numbers } from "web3";

export interface NativeCurrencyData {
  name: string;
  symbol: string;
  decimals: number;
}

export interface AddEthereumChainRequest {
  chainId: Numbers;
  blockExplorerUrls?: string[];
  chainName?: string;
  iconUrls?: string[];
  nativeCurrency?: NativeCurrencyData;
  rpcUrls?: string[];
}

export interface UpdateEthereumChainRequest {
  chainId: Numbers;
  blockExplorerUrl?: string;
  chainName?: string;
  nativeCurrency?: NativeCurrencyData;
  rpcUrls?: string[];
}

export interface SwitchEthereumChainRequest {
  chainId: Numbers;
}

export interface GetOwnedAssetsRequest {
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
}

export type OwnedAsset = {
  /**
   * Ethereum checksummed address of the asset.
   */
  address: string;
  /**
   * Identifier for the chain on which the assets are deployed.
   */
  chainId: number;
  /**
   * Asset interface ERC identifier, e.g., ERC20.
   * Optional - EIP-1820 could be used.
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
    balance: number;
    /**
     * The number of decimals implemented by the token. Optional.
     */
    decimals?: number;
  };
};

export type GetOwnedAssetsResult = OwnedAsset[];
