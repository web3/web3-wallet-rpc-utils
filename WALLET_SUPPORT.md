# Result of manual tests with wallets

## Browser extension wallets

| Method                     | Metamask | Coinbase Wallet | Trust Wallet | Enkrypt | Rainbow | Rabby Wallet | Exodus | Phantom | Uniswap Extension |
| -------------------------- | -------- | --------------- | ------------ | ------- | ------- | ------------ | ------ | ------- | ----------------- |
| wallet_addEthereumChain    | ✓        | ✓ (\*)          | ✓            | ✓       | ✓ (\*)  | ✓            | x (\*) | x (\*)  | x                 |
| wallet_switchEthereumChain | ✓        | ✓ (\*)          | ✓            | ✓       | ✓       | ✓            | ✓ (\*) | ✓ (\*)  | ✓ (\*)            |
| wallet_watchAsset          | ✓ (\*)   | ✓               | ✓ (\*)       | x       | ✓ (\*)  | ✓ (\*)       | x      | ✓ (\*)  | x                 |
| wallet_requestPermissions  | ✓ (\*)   | x               | ✓            | x (\*)  | x       | ✓            | ✓      | ✓       | ✓                 |
| wallet_getPermissions      | ✓        | x               | ✓            | x       | x       | ✓            | ✓      | ✓       | ✓                 |
| wallet_revokePermissions   | ✓        | x               | ✓            | x       | x       | ✓            | ✓ (\*) | x       | ✓                 |

- (✓) Supported
- (x) Not supported
- (\*) See additional remarks below

### Comments / Remarks

#### Expected behavior

- `wallet_addEthereumChain`: Adds a new chain to the wallet if it’s not already recognized, and switches to it.
- `wallet_switchEthereumChain`: Switches to a recognized chain; fails if the chain is not already added to the wallet.
- `wallet_watchAsset`: Adds a new asset to the wallet if it’s not already recognized.
- `wallet_requestPermissions`: Requests specific permissions from the wallet, triggering a modal for user approval.
- `wallet_getPermissions`: Retrieves the list of permissions the dApp currently has from the wallet.
- `wallet_revokePermissions`: Revokes previously granted permissions from the dApp.

#### Metamask

- `wallet_requestPermissions` and `wallet_getPermissions`: Returns a full response containing all permission fields according to the specification.
- `wallet_watchAsset`: There’s an issue with Web3RequestManager, causing an error with the wallet's response:

```
ResponseError: Returned error: Cannot destructure property 'tokenId' of 'n' as it is undefined.
at Web3RequestManager.<anonymous> (web3_request_manager.ts:178:1)
at Generator.next (<anonymous>)
at fulfilled (web3_request_manager.ts:1:1)`
```

#### Coinbase Wallet

- `wallet_addEthereumChain`: It does not fully adhere to the specification, as it changes the network temporarily but doesn’t save it. As a result, if the wallet does not natively support the network, following up with `wallet_switchEthereumChain` for the same network will fail.
- `wallet_watchAsset`: The wallet responds with a modal with the following message: "Coinbase Wallet automatically tracks token ownerships on the Ethereum network. There is no need to import USDC."

### Trust Wallet

- General Behavior is very similarly to MetaMask.
- `wallet_watchAsset`: Produces an error due to an issue with destructuring the wallet’s response:

```
WatchAsset.tsx:45 TypeError: Cannot destructure property 'address' of 'A' as it is undefined.
    at wi.request (inpage.js:247:201226)
    at inpage.js:247:206755
    at yu.handleStaticRequests (inpage.js:247:207086)
    at yu.request (inpage.js:247:206709)
    at web3_request_manager.ts:271:1
    at new Promise (<anonymous>)
    at Web3RequestManager.<anonymous> (web3_request_manager.ts:250:1)
    at Generator.next (<anonymous>)
    at web3_request_manager.ts:1:1
    at new Promise (<anonymous>)
```

### Enkrypt

- `wallet_requestPermissions`: Returns a limited response object, but no permissions appear to be granted, and no modal is shown to request user approval.

### Rainbow

- `wallet_addEthereumChain`: Adds a chain but does not switch to it; fails if the network is already known to the wallet.
- `wallet_watchAsset`: Fails with the error `"Internal error: Cannot read properties of undefined (reading 'address')"`.

### Rabby Wallet

- `wallet_requestPermissions` and `wallet_getPermissions`: Returns a response object containing only `parentCapability`, but functions as expected.
- `wallet_watchAsset`: Opens a modal with an “Add Custom Token” header, but it remains stuck and does not complete the action.

### Exodus

- `wallet_addEthereumChain` and `wallet_switchEthereumChain`: Only work with chains natively supported by the wallet; new chains cannot be added.
- `wallet_requestPermissions` and `wallet_getPermissions`: Returns a response object containing only `parentCapability`, but functions as expected.
- `wallet_revokePermissions`: Revokes permissions but also triggers an error: `DisconnectedError: The provider is disconnected from all chains`. This appears to be an issue with the wallet itself.

### Phantom

- `wallet_addEthereumChain` and `wallet_switchEthereumChain`: Only work with chains natively supported by the wallet; new chains cannot be added.
- `wallet_watchAsset`: Fails with an error:

```
WatchAsset.tsx:45 Ir: Missing or invalid parameters.
    at r.request (chrome-extension://bfnaelmomeimhlpmgjnjophhpkkoljpa/evmAsk.js:7:5094)
    at Web3RequestManager.<anonymous> (http://localhost:3000/static/js/bundle.js:80237:25)
    at Generator.next (<anonymous>)
    at http://localhost:3000/static/js/bundle.js:80100:67
    at new Promise (<anonymous>)
```

### Uniswap Extension

- `wallet_switchEthereumChain`: Only works with chains natively supported by the wallet; new chains cannot be added.

## Mobile wallets using WalletConnect

TBD
