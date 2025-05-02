// Level 3: Smart Contract Tip Jar with Aiken - Use Wallet-Derived Address for Tip Jar

// **Step 2: Use Wallet-Derived Address Instead of Script Address:**
// Instead of using an Aiken script address, we'll use an address generated from the wallet.

import Head from "next/head";
import { CardanoWallet, useWallet, MeshProvider } from "@meshsdk/react";
import { Transaction } from "@meshsdk/core";
import { useEffect, useState } from "react";

export default function TipJar() {
  const { connected, wallet, address } = useWallet();
  const [message, setMessage] = useState("");
  const JarWalletAddress = "addr_test1qrnen5pw7yatfz5s95kn8pdfrx97v6z4leymzaahllde8zcn08geeynhynw2j3udpef5ryep0crcx6acmek7769ttsxsq5t2ah"; // Use wallet address as the Tip Jar

  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);

  async function withdrawTips() {
    try {
      const tx = new Transaction({ initiator: wallet });
      tx.sendLovelace(JarWalletAddress, '5000000'); // Withdraw 5 ADA to own wallet
      tx.setMetadata(0, 'Wallet Tip Withdrawal');

      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx);
      const submittedTx = await wallet.submitTx(signedTx);
      setMessage(`Withdrawal submitted: ${submittedTx}`);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  }

  useEffect(() => {
      if (connected && wallet) {
        wallet.getLovelace().then((lovelace) => {
          setBalance(lovelace / 1e6);
        });
      }
    }, [connected, wallet]);

  return (
    <div className="bg-gray-900 w-full text-white text-center min-h-screen">
             <div className="mb-20 text-sky-500">
          <CardanoWallet isDark={false} />
        </div>

        {connected && balance !== null && (
          <div className="mt-4">
            <p>Balance: {balance} ADA</p>
          </div>
        )}

        {connected ? (
          <div>
            <p>Connected Wallet Address:</p>
            <p className="text-sm text-gray-400 break-all">{address}</p>
            <p>Jar Address:</p>
            <p className="text-sm text-gray-400 break-all">{JarWalletAddress}</p>
            
            {message && <p className="mt-4 text-sm text-gray-400">{message}</p>}
          </div>
        ) : (
          <p className="text-gray-500">Please connect your wallet.</p>
        )}
      
      <p>---</p>
      <button 
        className="mt-4 px-6 py-2 rounded bg-green-500 hover:bg-green-600 text-white"
        onClick={withdrawTips}
      >
        Withdraw Tips to My Wallet
      </button>
      {message && <p className="mt-4 text-sm text-gray-400">{message}</p>}
    </div>
  );
}
// Next: Test transaction on Cardano Preprod Network using wallet-derived address.
