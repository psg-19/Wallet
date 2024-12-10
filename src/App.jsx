import { useState } from 'react';
import { generateMnemonic } from "bip39";
import { Solana } from './Components/Solana';
 

function App() {
  const [mnemonic, setMnemonic] = useState("");
  const [custonMnemonics, setCustonMnemonics] = useState("");
  const [flag, setFlag] = useState(false);
  const [input_mnemonic, setInput_mnemonic] = useState(["", "", "", "", "", "", "", "", "", "", "", ""]);

  const writeMnemonic = (e, index) => {
    const newMnemonic = [...input_mnemonic];
    newMnemonic[index] = e.target.value;
    setInput_mnemonic(newMnemonic);
  };

  const fetchWalletDetails = () => {
    setFlag(true);
  };

  const RandomMnemonics = async () => {
    const mn = await generateMnemonic();
    setMnemonic(mn);
    setInput_mnemonic(mn.split(" "));
    setFlag(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-6 px-4">
      <h3 className="text-2xl font-semibold mb-6">Enter a 12-word mnemonic or generate one!</h3>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {input_mnemonic.map((val, index) => (
          <input
            key={index}
            type="text"
            value={val}
            onChange={(e) => writeMnemonic(e, index)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>

      <div className="mb-6">
        <button
          onClick={RandomMnemonics}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Generate Mnemonics
        </button>
      </div>

      <div className="text-center mb-6">OR</div>

      <input
        type="text"
        onChange={(e) => {
          setCustonMnemonics(e.target.value);
          setFlag(false);
        }}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />
      <button
        onClick={() => {
          const trimmedMnemonic = custonMnemonics.trim();
          if (trimmedMnemonic.split(" ").length !== 12) {
            alert("Please provide a string of length 12.");
            setFlag(false);
            return;
          }
          setInput_mnemonic(trimmedMnemonic.split(" "));
          fetchWalletDetails();
          setFlag(true);
        }}
        className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
      >
        Custom Mnemonics
      </button>

      {/* Conditional Rendering */}
      {flag && <Solana mnemonic={input_mnemonic} className="scroll-m-0"/>}
    </div>
  );
}

export default App;
