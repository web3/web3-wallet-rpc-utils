# Web3.js Plugin for Wallet RPC methods

This Web3.js plugin adds support for the following wallet-related RPC methods:

- wallet_addEthereumChain (EIP-3085)
- wallet_updateEthereumChain (EIP-2015)
- wallet_switchEthereumChain (EIP-3326)
- wallet_getOwnedAssets (EIP-2256)
- wallet_watchAsset (EIP-747)
- wallet_requestPermissions (EIP-2255)
- wallet_getPermissions (EIP-2255)

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
import { WalletRpcPlugin } from "web3-plugin-wallet-rpc";
web3 = new Web3(/* provider here */);
web3.registerPlugin(new WalletRpcPlugin());
```

### Methods

#### addEthereumChain

```typescript
await web3.walletRpc.addEthereumChain({ chainId: "0x1388" }); // chainId 5000 is Mantle Mainnet
```

## Contributing

We welcome pull requests! For major changes, please open an issue first to discuss the proposed modifications.
Also, ensure that you update tests as needed to reflect the changes.

## License

[MIT](https://choosealicense.com/licenses/mit/)
