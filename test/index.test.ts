import { Web3, core } from "web3";
import { WalletRpcPlugin } from "../src";

describe("WalletRpcPlugin Tests", () => {
  it("should register the plugin on Web3Context instance", () => {
    const web3Context = new core.Web3Context("http://127.0.0.1:8545");
    web3Context.registerPlugin(new WalletRpcPlugin());
    expect(web3Context.walletRpc).toBeDefined();
  });

  describe("plugin method tests", () => {
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

    it("should call addEthereumChain method with expected param", async () => {
      await web3.walletRpc.addEthereumChain({ chainId: "5000" });

      expect(requestManagerSendSpy).toHaveBeenCalledWith({
        method: "wallet_addEthereumChain",
        params: [{ chainId: "5000" }],
      });
    });
  });
});
