# Web3.js Plugin for Wallet RPC methods

This Web3.js plugin adds support for the following wallet-related RPC methods:

- [wallet_addEthereumChain (EIP-3085)](https://eips.ethereum.org/EIPS/eip-3085)
- [wallet_updateEthereumChain (EIP-2015)](https://eips.ethereum.org/EIPS/eip-2015)
- [wallet_switchEthereumChain (EIP-3326)](https://eips.ethereum.org/EIPS/eip-3326)
- [wallet_getOwnedAssets (EIP-2256)](https://eips.ethereum.org/EIPS/eip-2256)
- [wallet_watchAsset (EIP-747)](https://eips.ethereum.org/EIPS/eip-747)
- [wallet_requestPermissions (EIP-2255)](https://eips.ethereum.org/EIPS/eip-2255)
- [wallet_getPermissions (EIP-2255)](https://eips.ethereum.org/EIPS/eip-2255)

## Installation

Use your preferred package manager. Ensure that `web3` is also installed and integrated into your project.

```bash
npm install web3-plugin-wallet-rpc
```

```bash
yarn add web3-plugin-wallet-rpc
```

```bash
pnpm add web3-plugin-wallet-rpc
```

## Usage

### Register plugin

```typescript
import { Web3 } from "web3";
import { WalletRpcPlugin } from "web3-plugin-wallet-rpc";

const web3 = new Web3("https://eth.llamarpc.com");
web3.registerPlugin(new WalletRpcPlugin());
```

### Methods

#### addEthereumChain

Invokes the `wallet_addEthereumChain` method as defined in [EIP-3085](https://eips.ethereum.org/EIPS/eip-3085).

```typescript
await web3.walletRpc.addEthereumChain({
  chainId: 5000,
  blockExplorerUrls: ["https://mantlescan.xyz"],
  chainName: "Mantle",
  iconUrls: ["https://icons.llamao.fi/icons/chains/rsz_mantle.jpg"],
  nativeCurrency: {
    name: "Mantle",
    symbol: "MNT",
    decimals: 18,
  },
  rpcUrls: ["https://rpc.mantle.xyz"],
});
```

#### updateEthereumChain

Invokes the `wallet_updateEthereumChain` method as defined in [EIP-2015](https://eips.ethereum.org/EIPS/eip-2015).

```typescript
await web3.walletRpc.updateEthereumChain({
  chainId: 5000,
  blockExplorerUrls: ["https://mantlescan.xyz"],
  chainName: "Mantle",
  nativeCurrency: {
    name: "Mantle",
    symbol: "MNT",
    decimals: 18,
  },
  rpcUrls: ["https://rpc.mantle.xyz"],
});
```

#### switchEthereumChain

Invokes the `wallet_switchEthereumChain` method as defined in [EIP-3326](https://eips.ethereum.org/EIPS/eip-3326).

```typescript
await web3.walletRpc.switchEthereumChain({ chainId: 5000 });
```

#### getOwnedAssets

Invokes the `wallet_getOwnedAssets` method as defined in [EIP-2256](https://eips.ethereum.org/EIPS/eip-2256).

```typescript
const ownedAssets = await web3.walletRpc.getOwnedAssets({
  address: "0xa5653e88D9c352387deDdC79bcf99f0ada62e9c6",
});
```

#### watchAsset

Invokes the `wallet_watchAsset` method as defined in [EIP-747](https://eips.ethereum.org/EIPS/eip-747).

```typescript
await web3.walletRpc.watchAsset({
  type: "ERC20",
  options: {
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    symbol: "USDC",
  },
});
```

## Contributing

We welcome pull requests! For major changes, please open an issue first to discuss the proposed modifications.
Also, ensure that you update tests as needed to reflect the changes.

## License

[MIT](https://choosealicense.com/licenses/mit/)
