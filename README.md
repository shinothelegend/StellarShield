# StellarShield

StellarShield is a hackathon-ready demo for private payments on Stellar. The app combines a Next.js frontend, a Soroban privacy-pool contract, and a Circom-based zero-knowledge proof flow to show how users can deposit publicly and transfer privately while a contract verifies the proof on-chain.

## What is included

- A polished landing page for the product story and demo flow
- A browser-based dApp that connects a Stellar wallet, deposits funds, generates a Groth16 proof, and submits verification to the demo endpoint
- A Soroban contract that stores pool state and validates transfer requests
- A Circom circuit that proves a commitment relation over a secret and nullifier
- Generated proof artifacts in the public artifacts folder for the browser proof flow

## Project structure

- [app/page.tsx](app/page.tsx) – main landing experience
- [app/components/stellar-shield-app.tsx](app/components/stellar-shield-app.tsx) – demo dApp UI and proof flow
- [app/api/verify/route.ts](app/api/verify/route.ts#L1-L200) – verification endpoint (demo + Soroban RPC forwarding)
	- Accepts JSON with `proofHash` and `noteHash`.
	- If the body contains `signedTxXdr` the route forwards it to the Soroban RPC using the JSON-RPC `send_transaction` method (useful for submitting a client-signed invocation to the on-chain verifier contract).
	- Configure the RPC endpoint with `SOROBAN_RPC_URL` (see `.env.example`).
- [contracts/src/lib.rs](contracts/src/lib.rs) – Soroban contract
- [circuits/privacy.circom](circuits/privacy.circom) – Circom circuit
- [public/artifacts](public/artifacts) – wasm, zkey, and verification key files

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 to explore the product.

### Server verify endpoint

1. Copy `.env.example` to `.env.local` and optionally set `SOROBAN_RPC_URL`.
2. Start the app: `npm run dev`.
3. Use the included test script to try the demo and RPC flows:

```bash
bash scripts/test_verify.sh
```

To submit a real Soroban invocation, the frontend must produce a client-signed transaction XDR (from Freighter, Albedo, or a similar wallet) and POST it to `/api/verify` as `signedTxXdr`.

## Build and test

```bash
npm run build
cargo test --manifest-path contracts/Cargo.toml
```

## Demo flow

1. Open the dApp section.
2. Connect a Stellar wallet on testnet.
3. Deposit funds into the pool.
4. Generate a proof in the browser.
5. Verify the proof through the demo verification flow.

## Notes

The current demo uses a browser-generated proof and a local verification endpoint for the hackathon experience. The next step is to replace the demo endpoint with a live Soroban contract call against a deployed Stellar testnet contract.
