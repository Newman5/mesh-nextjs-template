import { MeshWallet } from "@meshsdk/core";
import { getYaciProvider } from "./get-yaci-provider";

export function getWalletForYaci() {
  const blockchainProvider = getYaciProvider();

  return new MeshWallet({
    networkId: 0, // Replace with the correct network ID
    fetcher: blockchainProvider,
    submitter: blockchainProvider,
    key: {
      type: "mnemonic",
      words: [
        "test",
        "test",
        "test",
        "test",
        "test",
        "test",
        "test",
        "test",
        "test",
        "test",
        "test",
        "test",
        "test",
        "test",
        "test",
        "test",
        "test",
        "test",
        "test",
        "test",
        "test",
        "test",
        "test",
        "sauce",
      ],
    },
  });
}