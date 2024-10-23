import { Web3 } from "web3";

import { WalletRpcPlugin } from "../src";

describe("WalletRpcPlugin", () => {
  describe("wallet_getOwnedAssets", () => {
    const web3 = new Web3("http://127.0.0.1:8545");
    web3.registerPlugin(new WalletRpcPlugin());

    const requestManagerSendSpy = jest.fn();
    web3.requestManager.send = requestManagerSendSpy;

    afterEach(() => {
      requestManagerSendSpy.mockClear();
    });

    it("should call the method with expected params", async () => {
      await web3.walletRpc.getOwnedAssets({
        address: "0xa5653e88D9c352387deDdC79bcf99f0ada62e9c6",
      });

      expect(requestManagerSendSpy).toHaveBeenCalledWith({
        method: "wallet_getOwnedAssets",
        params: [{ address: "0xa5653e88D9c352387deDdC79bcf99f0ada62e9c6" }],
      });
    });

    it("should throw when called with invalid address", async () => {
      await expect(
        web3.walletRpc.getOwnedAssets({ address: "" }),
      ).rejects.toThrow("validator found 1 error");
    });
  });
});
