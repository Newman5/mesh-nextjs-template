import { useEffect } from "react";
import { YaciProvider, MeshTxBuilder } from "@meshsdk/core";
import { getWalletForYaci } from "@/common/get-wallet-yaci";

export default function YaciTest() {
  useEffect(() => {
    const sendTransaction = async () => {
      try {
        // Step 1: Initialize the wallet and blockchain provider
        const wallet = getWalletForYaci();
        const blockchainProvider = new YaciProvider("https://yaci-node.meshjs.dev/api/v1/");
        console.log("Wallet Object:", wallet);

        // Step 2: Fetch UTxOs and change address
        const utxos = await wallet.getUtxos();
        console.log("UTxOs:", utxos);

        const changeAddress = await wallet.getChangeAddress();
        console.log("Change Address:", changeAddress);

        // Step 3: Build the transaction
        const txBuilder = new MeshTxBuilder({
          fetcher: blockchainProvider,
          evaluator: blockchainProvider,
        });

        const recipient = "addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr"; // Replace with your recipient address
        const unsignedTx = await txBuilder
          .txOut(recipient, [{ unit: "lovelace", quantity: "2000000" }]) // Sending 2 ADA
          .changeAddress(changeAddress)
          .selectUtxosFrom(utxos)
          .complete();

        console.log("Unsigned Transaction:", unsignedTx);

        // Step 4: Sign and submit the transaction
        const signedTx = await wallet.signTx(unsignedTx);
        console.log("Signed Transaction:", signedTx);

        const txHash = await blockchainProvider.submitTx(signedTx);
        console.log("Transaction Hash:", txHash);
      } catch (error) {
        console.error("Error sending transaction:", error);
      }
    };

    sendTransaction();
  }, []);

  return (
    <div>
      <h1>Yaci Test</h1>
      <p>Check the console for transaction details.</p>
    </div>
  );
}