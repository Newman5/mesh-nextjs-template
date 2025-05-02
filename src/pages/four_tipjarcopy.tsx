// Level 3: Smart Contract Tip Jar with Aiken - Pseudocode Steps

// 1. **Set Up Smart Contract (Aiken):**
//    - Write an Aiken script that locks funds into a contract address.
//    - Define spending conditions (e.g., only the owner can withdraw).

// 2. **Deploy the Aiken Contract:**
//    - Generate the script address from the Aiken script.
//    - Fund the script address with initial ADA.

// 3. **Create the Frontend Tip Interface (React + Mesh):**
//    - Add a button labeled 'Tip Me 5 ADA'.
//    - Connect the Cardano wallet using Mesh.

// 4. **Build the Tip Transaction:**
//    - Construct a transaction using `@meshsdk/core`.
//    - Send 5 ADA to the script address (Aiken smart contract).
//    - Attach metadata to identify the purpose of the tip.

// 5. **Sign and Submit Transaction:**
//    - Use Mesh to sign the transaction.
//    - Submit it to the Cardano blockchain.

// 6. **Display Transaction Status:**
//    - Show success with transaction hash or error if failed.

// 7. **Withdraw from Contract (Aiken Script):**
//    - Execute the Aiken script with a redeemer (proof of ownership).
//    - Collect all tips from the contract address.

// This pseudocode outlines the key steps before we implement the full solution.

import Head from "next/head";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import { Transaction } from "@meshsdk/core";
import { useEffect, useState } from "react";

export default function TipJar() {
  const { connected, wallet, address } = useWallet();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);

  // Replace with your own wallet address
  const JarScriptAddress = "addr_test1wpztc5pzzgg4rcd6xr67yh28a6kl237nvx9v6mj7sgktekced08js"; 

  useEffect(() => {
    if (connected && wallet) {
      wallet.getLovelace().then((lovelace) => {
        setBalance(lovelace / 1e6);
      });
    }
  }, [connected, wallet]);
  //Error: (intermediate value).sendLovelace(...).attachMetadata is not a function

  async function sendTip() {
    if (!wallet) return setMessage("Please connect your wallet.");

    try {
      setIsLoading(true);
      setMessage("");

      // Create a transaction
      const tx = new Transaction({ initiator: wallet })
        .sendLovelace(JarScriptAddress, 5000000) // 5 ADA (in Lovelace)
        .attachMetadata(721, { purpose: "Aiken Smart Contract Tip" });

      // Build the transaction
      const builtTx = await tx.build();

      // Sign the transaction
      const signedTx = await wallet.signTx(builtTx, true);

      // Submit the transaction
      const submittedTx = await wallet.submitTx(signedTx);

      setMessage(`Transaction submitted! TxHash: ${submittedTx}`);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
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
            <p className="text-sm text-gray-400 break-all">{JarScriptAddress}</p>
            <button 
              className={`mt-4 px-6 py-2 rounded text-white ${isLoading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
              onClick={sendTip}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Tip Me 5 ADA'}
            </button>
            {message && <p className="mt-4 text-sm text-gray-400">{message}</p>}
          </div>
        ) : (
          <p className="text-gray-500">Please connect your wallet.</p>
        )}

<p>Go to the <a href="/five_tipjar_withdraw" className="text-sky-600">Withdraw from Tips</a> page.</p>

      </main>
    </div>
  );
}