import Head from "next/head";
import { CardanoWallet, MeshBadge,useWallet } from "@meshsdk/react";
import { Transaction } from "@meshsdk/core";
import { useEffect, useState } from "react";

export default function Home() {
  const { connected, wallet, address } = useWallet();
  const [message, setMessage] = useState("");

  // Replace with your own wallet address
  const tipAddress = "addr_test1wpztc5pzzgg4rcd6xr67yh28a6kl237nvx9v6mj7sgktekced08js"; 

  async function sendTip() {
    if (!wallet) return setMessage("Please connect your wallet.");

    try {
      // Create a transaction
      const tx = new Transaction({ initiator: wallet })
        .sendLovelace(tipAddress, '5000000'); // 5 ADA (in Lovelace)

      // Build the transaction
      const builtTx = await tx.build();

      // Sign the transaction
      const signedTx = await wallet.signTx(builtTx);

      // Submit the transaction
      const submittedTx = await wallet.submitTx(signedTx);

      setMessage(`Transaction submitted! TxHash: ${submittedTx}`);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  }

  return (
    <div className="bg-gray-900 w-full text-white text-center">
      <Head>
        <title>Mesh App on Cardano</title>
        <meta name="description" content="A Cardano dApp powered by Mesh" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-6xl font-thin mb-20">
          <a href="https://meshjs.dev/" className="text-sky-600">Mesh</a> Next.js
        </h1>

        <div className="mb-20">
          <CardanoWallet />
        </div>

        {connected ? (
          <div>
            <p>Wallet Address:</p>
            <p className="text-sm text-gray-400 break-all">{address}</p>
            <button 
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={sendTip}
            >
              Tip Me 5 ADA
            </button>
            {message && <p className="mt-4 text-sm text-gray-400">{message}</p>}
          </div>
        ) : (
          <p className="text-gray-500">Please connect your wallet.</p>
        )}
      </main>
    </div>
  );
}
