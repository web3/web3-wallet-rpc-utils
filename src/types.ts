import { Numbers } from "web3";

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
