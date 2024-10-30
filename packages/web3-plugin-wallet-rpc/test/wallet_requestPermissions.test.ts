import { Web3Context } from 'web3-core';

import { WalletRpcPlugin } from '../src';

describe('WalletRpcPlugin', () => {
  describe('wallet_requestPermissions', () => {
    const web3 = new Web3Context('http://127.0.0.1:8545');
    web3.registerPlugin(new WalletRpcPlugin());

    const requestManagerSendSpy = jest.fn();
    web3.requestManager.send = requestManagerSendSpy;

    afterEach(() => {
      requestManagerSendSpy.mockClear();
    });

    it('should call the method with expected params', async () => {
      const request = {
        eth_accounts: {},
      };

      await web3.walletRpc.requestPermissions(request);

      expect(requestManagerSendSpy).toHaveBeenCalledWith({
        method: 'wallet_requestPermissions',
        params: [request],
      });
    });
  });
});
