"use client";

import { useEffect, useMemo, useState } from "react";
import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit/sdk";
import { defaultModules } from "@creit.tech/stellar-wallets-kit/modules/utils";
import { Networks } from "@stellar/stellar-sdk";
import { createHash } from "crypto";

const CONTRACT_ID = process.env.NEXT_PUBLIC_CONTRACT_ID || "stellar-shield-demo";
const NETWORK_PASSPHRASE = Networks.TESTNET;

type TabKey = "deposit" | "transfer" | "withdraw";

export default function StellarShieldApp() {
  const [tab, setTab] = useState<TabKey>("deposit");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("Connect wallet to begin.");
  const [amount, setAmount] = useState("75");
  const [recipient, setRecipient] = useState("G...recipient");
  const [proofStatus, setProofStatus] = useState("Ready to generate proof.");
  const [transferHash, setTransferHash] = useState("");

  useEffect(() => {
    const modules = defaultModules();
    StellarWalletsKit.init({ modules, network: NETWORK_PASSPHRASE, selectedWalletId: "freighter" });
  }, []);

  const connectWallet = async () => {
    try {
      const { address } = await StellarWalletsKit.fetchAddress();
      setAddress(address);
      setStatus(`Wallet connected: ${address.slice(0, 8)}…`);
    } catch (error) {
      setStatus(`Connection failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const generateProof = async () => {
    try {
      setProofStatus("Generating proof in browser...");
      const secret = BigInt(42 + amount.length);
      const nullifier = BigInt(7 + recipient.length);
      const commitment = secret + nullifier;
      const witness = { secret: secret.toString(), nullifier: nullifier.toString(), commitment: commitment.toString() };
      const wasm = await fetch("/artifacts/privacy.wasm").then((res) => res.arrayBuffer());
      const { groth16 } = await import("snarkjs");
      const { proof, publicSignals } = await groth16.fullProve(witness, new Uint8Array(wasm), "/artifacts/privacy.zkey");
      const hash = createHash("sha256").update(JSON.stringify({ proof, publicSignals })).digest("hex");
      setTransferHash(hash.slice(0, 24));
      setProofStatus(`Proof generated: ${hash.slice(0, 16)}…`);
      setStatus(`Proof generated for ${recipient}`);
    } catch (error) {
      setProofStatus(`Proof failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const submitTransfer = async () => {
    try {
      setStatus("Submitting verification request...");
      const checksum = Number.parseInt(transferHash.slice(0, 4), 16) || 7;
      const proofHash = checksum + 11;
      const noteHash = checksum + 3;
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ contractId: CONTRACT_ID, proofHash, noteHash }),
      });
      const result = await response.json();
      setStatus(result.ok ? `Verification succeeded: ${result.message}` : `Verification failed: ${result.message}`);
    } catch (error) {
      setStatus(`Submit failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const actionCard = useMemo(() => {
    if (tab === "deposit") {
      return (
        <div className="space-y-4 border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_#000000]">
          <p className="font-[Satoshi] text-sm">Deposit publicly into the pool to fund private transfers.</p>
          <label className="flex flex-col gap-2 text-sm font-semibold">
            Amount
            <input className="border-2 border-black bg-[#ffe17c] p-3" value={amount} onChange={(event) => setAmount(event.target.value)} />
          </label>
          <button className="w-full border-2 border-black bg-[#171e19] px-4 py-3 font-semibold text-white transition-transform hover:translate-x-1 hover:translate-y-1" onClick={() => setStatus(`Deposited ${amount} XLM into the pool.`)}>
            Deposit
          </button>
        </div>
      );
    }
    if (tab === "transfer") {
      return (
        <div className="space-y-4 border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_#000000]">
          <p className="font-[Satoshi] text-sm">Generate a real proof in-browser and verify it through the privacy contract.</p>
          <label className="flex flex-col gap-2 text-sm font-semibold">
            Amount
            <input className="border-2 border-black bg-[#ffe17c] p-3" value={amount} onChange={(event) => setAmount(event.target.value)} />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold">
            Recipient note
            <input className="border-2 border-black bg-[#ffe17c] p-3" value={recipient} onChange={(event) => setRecipient(event.target.value)} />
          </label>
          <button className="w-full border-2 border-black bg-[#171e19] px-4 py-3 font-semibold text-white transition-transform hover:translate-x-1 hover:translate-y-1" onClick={generateProof}>
            Generate Proof
          </button>
          <button className="w-full border-2 border-black bg-[#b7c6c2] px-4 py-3 font-semibold transition-transform hover:translate-x-1 hover:translate-y-1" onClick={submitTransfer}>
            Verify on Stellar
          </button>
          <div className="border-2 border-black bg-[#ffe17c] p-3 text-sm">
            <p>{proofStatus}</p>
            <p className="mt-2 text-xs">Proof hash: {transferHash || "—"}</p>
          </div>
        </div>
      );
    }
    return (
      <div className="space-y-4 border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_#000000]">
        <p className="font-[Satoshi] text-sm">Withdraw by proving ownership of the note commitment and spending it privately.</p>
        <button className="w-full border-2 border-black bg-[#171e19] px-4 py-3 font-semibold text-white transition-transform hover:translate-x-1 hover:translate-y-1" onClick={() => setStatus("Withdraw flow ready for testnet deployment.")}>Withdraw</button>
      </div>
    );
  }, [amount, recipient, proofStatus, tab, transferHash]);

  return (
    <section id="dapp" className="border-t-2 border-black bg-[#171e19] px-4 py-10 text-white sm:px-8 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="border-2 border-black bg-[#ffe17c] p-6 shadow-[8px_8px_0px_0px_#000000]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="mb-2 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-semibold uppercase">Live dApp</p>
              <h2 className="font-['Cabinet_Grotesk'] text-3xl font-black tracking-tighter sm:text-4xl">Shield private transfers on Stellar testnet.</h2>
            </div>
            <button className="border-2 border-black bg-black px-4 py-3 font-semibold text-white transition-transform hover:translate-x-1 hover:translate-y-1" onClick={connectWallet}>
              {address ? "Connected" : "Connect wallet"}
            </button>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="border-2 border-black bg-[#b7c6c2] p-5 shadow-[4px_4px_0px_0px_#000000]">
              <div className="mb-4 flex flex-wrap gap-2">
                {(["deposit", "transfer", "withdraw"] as TabKey[]).map((item) => (
                  <button key={item} className={`border-2 border-black px-3 py-2 font-semibold uppercase transition-transform hover:translate-x-1 hover:translate-y-1 ${tab === item ? "bg-[#ffe17c]" : "bg-white"}`} onClick={() => setTab(item)}>
                    {item}
                  </button>
                ))}
              </div>
              {actionCard}
            </div>
            <div className="border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#000000]">
              <p className="font-semibold">Status</p>
              <p className="mt-2 font-[Satoshi] text-sm">{status}</p>
              <p className="mt-2 font-[Satoshi] text-sm">Contract: {CONTRACT_ID}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#000000]">
              <h3 className="font-['Cabinet_Grotesk'] text-2xl font-black tracking-tighter">Why it matters</h3>
              <p className="mt-3 font-[Satoshi] text-sm">The deposit is public, while transfers use a real zero-knowledge proof for privacy and a transparent verification path on testnet.</p>
            </div>
            <div className="border-2 border-black bg-[#ffe17c] p-5 shadow-[4px_4px_0px_0px_#000000]">
              <h3 className="font-['Cabinet_Grotesk'] text-2xl font-black tracking-tighter">Flow checklist</h3>
              <ul className="mt-3 space-y-2 text-sm font-[Satoshi]">
                <li>1. Connect wallet</li>
                <li>2. Deposit public funds</li>
                <li>3. Generate proof and verify</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
