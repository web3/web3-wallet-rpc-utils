import { Web3Context } from 'web3-core';

import { WalletRpcPlugin } from '../src';

describe('WalletRpcPlugin', () => {
  describe('wallet_watchAsset', () => {
    const web3 = new Web3Context('http://127.0.0.1:8545');
    web3.registerPlugin(new WalletRpcPlugin());

    const requestManagerSendSpy = jest.fn();
    web3.requestManager.send = requestManagerSendSpy;

    afterEach(() => {
      requestManagerSendSpy.mockClear();
    });

    it('should call the method with expected params', async () => {
      const request = {
        type: 'ERC20',
        options: {
          address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          symbol: 'USDC',
        },
      };

      await web3.walletRpc.watchAsset(request);

      expect(requestManagerSendSpy).toHaveBeenCalledWith({
        method: 'wallet_watchAsset',
        params: [request],
      });
    });
  });
});
