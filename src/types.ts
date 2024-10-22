export interface AddEthereumChainParameter {
  chainId: string; // should be a 0x-prefixed hexadecimal string per EIP-695
  blockExplorerUrls?: string[];
  chainName?: string;
  iconUrls?: string[];
  nativeCurrency?: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls?: string[];
}
