import Head from "next/head";
import { CardanoWallet } from '@meshsdk/react';

export default function Page() {
  return (
    <div className="bg-gray-900 w-full text-white text-center">
      <Head>
        <title>Mesh App on Cardano</title>
        <meta name="description" content="A Cardano dApp powered by Mesh" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="text-gray-500">
      <CardanoWallet />
      </div>
   </main>
   </div>
  );
}