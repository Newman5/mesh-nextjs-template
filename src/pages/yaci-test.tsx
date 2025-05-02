import { useEffect } from "react";
import { Transaction } from "@meshsdk/core";
import { getWalletForYaci } from "@/common/get-wallet-yaci";
import { getYaciProvider } from "@/common/get-yaci-provider";

export default function YaciTest() {
  useEffect(() => {
    const sendTransaction = async () => {
      try {
        const wallet = getWalletForYaci();
        const provider = getYaciProvider();
  
        // Step 1: Verify the wallet object
        console.log("Wallet Object:", wallet);
  
        // Step 2: Fetch the payment address
        const addresses = await wallet.getUsedAddresses();
        console.log("Used Addresses:", addresses);

        const paymentAddress = addresses[0]; // Use the first address
        console.log("Payment Address:", paymentAddress);
  
        // Step 3: Fetch UTxOs for the payment address
        const balance = await provider.fetchAddressUTxOs(paymentAddress);
        console.log("Wallet Balance (UTxOs):", balance);
  
        // Step 4: Ensure sufficient funds
        if (balance.length === 0) {
          throw new Error("Wallet has no UTxOs available.");
        }
  
        const recipient =
          "addr_test1qqm87edtdxc7vu2u34dpf9jzzny4qhk3wqezv6ejpx3vgrwt46dz4zq7vqll88fkaxrm4nac0m5cq50jytzlu0hax5xqwlraql";
  
        const tx = new Transaction({ initiator: wallet }).sendLovelace(
          recipient,
          "25000000" // Adjust amount if needed
        );
  
        const unsignedTx = await tx.build();
        const signedTx = await wallet.signTx(unsignedTx);
        const txHash = await wallet.submitTx(signedTx);
  
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