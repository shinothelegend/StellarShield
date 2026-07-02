import StellarShieldApp from "./components/stellar-shield-app";

const logos = ["Stellar Development Foundation", "Nethermind", "OpenZeppelin", "Zama", "Privacy Pools", "Soroban"];
const footerSections: Array<[string, string[]]> = [
  ["Product", ["Home", "dApp", "Docs"]],
  ["Stack", ["Next.js", "Soroban", "Circom"]],
  ["Social", ["GitHub", "X", "Discord"]],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#171e19] text-[#171e19]">
      <nav className="sticky top-0 z-20 flex h-20 items-center justify-between border-b-2 border-black bg-[#ffe17c] px-4 sm:px-8 lg:px-16">
        <a href="#home" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center border-2 border-black bg-[#171e19] text-lg font-black text-[#ffe17c]">⚡</div>
          <span className="font-['Cabinet_Grotesk'] text-xl font-black tracking-tighter">StellarShield</span>
        </a>
        <div className="hidden items-center gap-6 text-sm font-black uppercase md:flex">
          <a href="#home" className="border-b-2 border-transparent hover:border-black">Home</a>
          <a href="#how" className="border-b-2 border-transparent hover:border-black">How it Works</a>
          <a href="#dapp" className="border-b-2 border-transparent hover:border-black">dApp</a>
          <a href="#docs" className="border-b-2 border-transparent hover:border-black">Docs</a>
        </div>
        <a href="#dapp" className="border-2 border-black bg-black px-4 py-3 text-sm font-bold text-white shadow-[4px_4px_0px_0px_#000000] transition-transform hover:translate-x-1 hover:translate-y-1">Launch dApp</a>
      </nav>

      <section id="home" className="relative overflow-hidden bg-[#ffe17c] px-4 py-16 sm:px-8 lg:px-16 lg:py-24">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-4 inline-block border-2 border-black bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.2em]">NEW: Built for Stellar Hacks – Real-World ZK</p>
            <h1 className="font-['Cabinet_Grotesk'] text-5xl font-black tracking-tighter sm:text-6xl lg:text-7xl">
              <span className="block">Private Payments.</span>
              <span className="block text-transparent [-webkit-text-stroke:3px_#000000]">Confidential by design.</span>
            </h1>
            <p className="mt-6 max-w-2xl font-[Satoshi] text-lg leading-8">Transparent blockchains expose sensitive flows. StellarShield hides amounts and counterparties with a zero-knowledge proof, while the Soroban contract verifies validity on-chain.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#dapp" className="border-2 border-black bg-black px-5 py-3 font-bold text-white shadow-[4px_4px_0px_0px_#000000] transition-transform hover:translate-x-1 hover:translate-y-1">Launch dApp</a>
              <a href="#how" className="border-2 border-black bg-white px-5 py-3 font-bold shadow-[4px_4px_0px_0px_#000000] transition-transform hover:translate-x-1 hover:translate-y-1">Watch 2-min Demo</a>
            </div>
          </div>
          <div className="border-2 border-black bg-white p-4 shadow-[8px_8px_0px_0px_#000000]">
            <div className="border-2 border-black bg-[#171e19] p-3">
              <div className="mb-3 flex items-center gap-2 border-b-2 border-black pb-2">
                <div className="h-3 w-3 border-2 border-black bg-[#ffe17c]" />
                <div className="h-3 w-3 border-2 border-black bg-[#b7c6c2]" />
                <div className="h-3 w-3 border-2 border-black bg-white" />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="border-2 border-black bg-[#b7c6c2] p-3">
                  <p className="text-xs font-black uppercase">Pool balance</p>
                  <p className="mt-2 text-3xl font-black">384.21</p>
                </div>
                <div className="border-2 border-black bg-[#ffe17c] p-3">
                  <p className="text-xs font-black uppercase">Verified transfers</p>
                  <p className="mt-2 text-3xl font-black">12</p>
                </div>
                <div className="col-span-2 border-2 border-black bg-white p-3">
                  <p className="text-xs font-black uppercase">Proof status</p>
                  <p className="mt-2 text-sm font-[Satoshi]">Groth16 proof generated and verified on testnet.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#171e19] py-4 text-[#b7c6c2]">
        <div className="flex animate-[scroll_20s_linear_infinite] whitespace-nowrap">
          {Array.from({ length: 2 }).flatMap((_, index) => logos.map((logo) => <span key={`${index}-${logo}`} className="mx-6 text-sm font-black uppercase tracking-[0.3em] opacity-70">{logo}</span>))}
        </div>
      </section>

      <section className="grid gap-6 bg-white px-4 py-16 sm:px-8 lg:grid-cols-2 lg:px-16">
        <div className="border-2 border-dashed border-black bg-[#f3f3f3] p-8 shadow-[4px_4px_0px_0px_#000000]">
          <p className="text-sm font-black uppercase">Problem</p>
          <h2 className="mt-3 font-['Cabinet_Grotesk'] text-3xl font-black tracking-tighter">Public transactions reveal everything.</h2>
          <p className="mt-4 font-[Satoshi] text-lg">On-chain activity exposes amounts, counterparties, and timing habits.</p>
        </div>
        <div className="border-2 border-black bg-[#ffe17c] p-8 shadow-[8px_8px_0px_0px_#000000]">
          <p className="text-sm font-black uppercase">Solution</p>
          <h2 className="mt-3 font-['Cabinet_Grotesk'] text-3xl font-black tracking-tighter">StellarShield hides transfer details while proving validity on-chain.</h2>
          <p className="mt-4 font-[Satoshi] text-lg">A privacy-pool style mechanism lets users deposit publicly and move value privately with a real ZK proof.</p>
        </div>
      </section>

      <section className="bg-[#ffe17c] px-4 py-16 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-['Cabinet_Grotesk'] text-3xl font-black tracking-tighter">Why teams choose StellarShield</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {[
              ["Privacy Pools", "Deposit publicly, transfer privately with a note commitment and zero-knowledge proof."],
              ["On-Chain Verification", "Soroban verifies the Groth16 proof in a real testnet contract call."],
              ["Compliance-Friendly", "Prove correctness without leaking wallet and amount metadata."],
            ].map(([title, description]) => (
              <div key={title} className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_#000000]">
                <h3 className="font-['Cabinet_Grotesk'] text-2xl font-black tracking-tighter">{title}</h3>
                <p className="mt-3 font-[Satoshi] text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="bg-[#171e19] px-4 py-16 text-white sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-['Cabinet_Grotesk'] text-3xl font-black tracking-tighter">How it works</h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {[
              ["01", "Connect Wallet & Deposit", "Use a Stellar wallet to fund the pool on testnet."],
              ["02", "Generate ZK Proof", "Create a browser-based Groth16 proof over a secret and nullifier."],
              ["03", "Verify on Stellar", "The Soroban contract checks the proof and records the private transfer."],
            ].map(([step, title, description]) => (
              <div key={title} className="border-2 border-black bg-[#171e19] p-6 shadow-[4px_4px_0px_0px_#000000]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center border-2 border-black bg-[#b7c6c2] text-xl font-black text-black">{step}</div>
                <h3 className="font-['Cabinet_Grotesk'] text-2xl font-black tracking-tighter">{title}</h3>
                <p className="mt-3 font-[Satoshi] text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl grid gap-6 lg:grid-cols-3">
          <div className="border-2 border-black bg-[#b7c6c2] p-6 shadow-[4px_4px_0px_0px_#000000]">
            <h3 className="font-['Cabinet_Grotesk'] text-2xl font-black tracking-tighter">DeFi User</h3>
            <p className="mt-3 font-[Satoshi] text-sm">Private stablecoin transfers with no public exposure.</p>
          </div>
          <div className="border-2 border-black bg-[#ffe17c] p-6 shadow-[8px_8px_0px_0px_#000000]">
            <h3 className="font-['Cabinet_Grotesk'] text-2xl font-black tracking-tighter">Treasury Manager</h3>
            <p className="mt-3 font-[Satoshi] text-sm">Confidential payroll and employee disbursements.</p>
          </div>
          <div className="border-2 border-black bg-[#171e19] p-6 text-white shadow-[4px_4px_0px_0px_#000000]">
            <h3 className="font-['Cabinet_Grotesk'] text-2xl font-black tracking-tighter">Compliance Officer</h3>
            <p className="mt-3 font-[Satoshi] text-sm">Verifiable privacy with auditable proof metadata.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#b7c6c2] px-4 py-16 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl grid gap-6 lg:grid-cols-3">
          {[
            ["Mina", "“The UX felt like a real product, not a demo.”", "★★★★★"],
            ["Ari", "“The proof flow was crisp and the on-chain check was immediate.”", "★★★★★"],
            ["Noah", "“This is the privacy primitive Stellar needs.”", "★★★★★"],
          ].map(([name, quote, rating]) => (
            <div key={name} className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_#000000]">
              <p className="text-xl font-black">{rating}</p>
              <p className="mt-3 font-[Satoshi] text-sm">“{quote}”</p>
              <p className="mt-4 font-black uppercase">{name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#ffe17c] px-4 py-16 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-3xl border-2 border-black bg-white p-8 text-center shadow-[8px_8px_0px_0px_#000000]">
          <h2 className="font-['Cabinet_Grotesk'] text-3xl font-black tracking-tighter">Ready to build private finance on Stellar?</h2>
          <a href="#dapp" className="mt-6 inline-block border-2 border-black bg-black px-6 py-3 font-bold text-white shadow-[4px_4px_0px_0px_#000000] transition-transform hover:translate-x-1 hover:translate-y-1">Launch dApp</a>
        </div>
      </section>

      <footer id="docs" className="border-t-2 border-black bg-[#171e19] px-4 py-12 text-white sm:px-8 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
          <div>
            <h3 className="font-['Cabinet_Grotesk'] text-xl font-black tracking-tighter">StellarShield</h3>
            <p className="mt-3 font-[Satoshi] text-sm opacity-80">Private payments on Stellar with real ZK proof verification.</p>
          </div>
          {footerSections.map(([title, items]) => (
            <div key={String(title)}>
              <h4 className="font-black uppercase">{title}</h4>
              <ul className="mt-3 space-y-2 text-sm font-[Satoshi] opacity-80">
                {items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </footer>

      <StellarShieldApp />
    </main>
  );
}
