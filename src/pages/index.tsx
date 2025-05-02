import Head from "next/head";
import { CardanoWallet, MeshBadge, useWallet } from "@meshsdk/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { connected, wallet, address } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (connected && wallet) {
      wallet.getLovelace().then((lovelace) => {
        setBalance(lovelace / 1e6);
      });
    }
  }, [connected, wallet]);

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

        <div className="mb-20 text-gray-500">
          <CardanoWallet />
        </div>

        {connected ? (
          <div>
            <p>Wallet Address:</p>
            <p className="text-sm text-gray-400 break-all">{address}</p>
          </div>
        ) : (
          <p className="text-gray-500">Please connect your wallet.</p>
        )}

        {connected && balance !== null && (
          <div className="mt-4">
            <p>Balance: {balance} ADA</p>
          </div>
        )}
      </main>
    </div>
  );
}
