import { Web3 } from "web3";
import { WalletRpcPlugin } from "../src";

describe("WalletRpcPlugin", () => {
  describe("wallet_updateEthereumChain", () => {
    let requestManagerSendSpy: jest.Mock;
    let web3: Web3;

    beforeAll(() => {
      web3 = new Web3("http://127.0.0.1:8545");
      web3.registerPlugin(new WalletRpcPlugin());

      requestManagerSendSpy = jest.fn();
      web3.requestManager.send = requestManagerSendSpy;
    });

    afterAll(() => {
      requestManagerSendSpy.mockClear();
    });

    it("should call the method with expected params", async () => {
      await web3.walletRpc.updateEthereumChain({ chainId: 5000 });

      expect(requestManagerSendSpy).toHaveBeenCalledWith({
        method: "wallet_updateEthereumChain",
        params: [{ chainId: "0x1388" }],
      });
    });

    it("should return correct result", async () => {
      const result = await web3.walletRpc.updateEthereumChain({
        chainId: 5000,
      });

      expect(result).toBeUndefined();
    });

    it("should pass all possible fields as a param", async () => {
      const request = {
        chainId: 5000,
        blockExplorerUrls: ["https://mantlescan.xyz"],
        chainName: "Mantle",
        nativeCurrency: {
          name: "Mantle",
          symbol: "MNT",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.mantle.xyz"],
      };

      await web3.walletRpc.updateEthereumChain(request);

      expect(requestManagerSendSpy).toHaveBeenCalledWith({
        method: "wallet_updateEthereumChain",
        params: [
          {
            ...request,
            chainId: "0x1388",
          },
        ],
      });
    });
  });
});
