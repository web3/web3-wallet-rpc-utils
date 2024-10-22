import { Address, HexString, Numbers } from "web3";

export interface NativeCurrencyData {
  name: string;
  symbol: string;
  decimals: number;
}

export interface AddEthereumChainRequest {
  chainId: Numbers; // HexString;
  blockExplorerUrls?: string[];
  chainName?: string;
  iconUrls?: string[];
  nativeCurrency?: NativeCurrencyData;
  rpcUrls?: string[];
}

export interface UpdateEthereumChainRequest {
  chainId: HexString;
  blockExplorerUrl?: string;
  chainName?: string;
  nativeCurrency?: NativeCurrencyData;
  rpcUrls?: string[];
}

export interface SwitchEthereumChainRequest {
  chainId: HexString;
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
    chainId?: HexString;
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

export interface GetOwnedAssetsResult {}
