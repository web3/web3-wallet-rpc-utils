import { core } from "web3";
import { WalletRpcPlugin } from "../src";

describe("WalletRpcPlugin", () => {
  it("should register the plugin on Web3Context instance", () => {
    const web3Context = new core.Web3Context("http://127.0.0.1:8545");
    web3Context.registerPlugin(new WalletRpcPlugin());
    expect(web3Context.walletRpc).toBeDefined();
  });
});
