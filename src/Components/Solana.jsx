import React, { useState } from 'react';
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

export const Solana = ({ mnemonic }) => {
  console.log("Mnemonic:", mnemonic);
  const [currIndx, setCurrIndx] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);

  const generateSolanawallet = () => {
    const seed = mnemonicToSeed(mnemonic.join(" "));
    const path = `m/44'/501'/${currIndx}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    setCurrIndx(currIndx + 1);
    setPublicKeys([...publicKeys, keypair.publicKey]);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-80 mx-auto mt-6 ">
      <h2 className="text-xl font-semibold text-center mb-4">Solana Wallet Generator</h2>
      
      <button
        onClick={() => generateSolanawallet()}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        Add Wallet
      </button>

      <div className="mt-6">
        {publicKeys.length === 0 ? (
          <p className="text-gray-500 text-center">No wallets generated yet.</p>
        ) : (
          <div>
            <h3 className="text-lg font-semibold mb-2">Generated Wallets:</h3>
            <ul className="space-y-2">
              {publicKeys.map((key, index) => (
                <li
                  key={index}
                  className="bg-gray-100 p-2 rounded-md text-sm text-center break-all"
                >
                  {key.toBase58()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
