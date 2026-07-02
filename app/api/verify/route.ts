import { NextRequest, NextResponse } from "next/server";

const DEFAULT_SOROBAN_RPC = process.env.SOROBAN_RPC_URL || "https://rpc.testnet.soroban.stellar.org";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const proofHash = Number(body?.proofHash ?? 0);
  const noteHash = Number(body?.noteHash ?? 0);
  const signedTxXdr = body?.signedTxXdr;

  if (!proofHash || !noteHash) {
    return NextResponse.json({ ok: false, message: "Missing proof or note hash." }, { status: 400 });
  }

  // If the client supplied a pre-signed Soroban transaction XDR, submit it
  // to the configured Soroban RPC. The frontend (wallet) should sign the
  // transaction that invokes the on-chain verifier contract.
  if (signedTxXdr && typeof signedTxXdr === "string") {
    try {
      const rpcPayload = {
        jsonrpc: "2.0",
        id: 1,
        method: "send_transaction",
        params: [signedTxXdr],
      };

      const rpcRes = await fetch(DEFAULT_SOROBAN_RPC, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rpcPayload),
      });

      const rpcJson = await rpcRes.json();

      if (rpcJson?.error) {
        return NextResponse.json({ ok: false, message: "Soroban RPC error", error: rpcJson.error }, { status: 502 });
      }

      return NextResponse.json({
        ok: true,
        message: `Transaction submitted to Soroban RPC (testnet).`,
        tx: rpcJson.result ?? rpcJson,
        contractId: body?.contractId || null,
        proofHash: proofHash,
        noteHash: noteHash,
      });
    } catch (err: any) {
      return NextResponse.json({ ok: false, message: "Failed to reach Soroban RPC.", error: String(err) }, { status: 502 });
    }
  }

  // Fallback: keep the old demo verification behavior for local testing.
  if (proofHash % 7 !== 0) {
    return NextResponse.json({ ok: false, message: "Proof verification rejected." }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    message: `Transfer verified (demo) for note ${noteHash}.`,
    contractId: body?.contractId || "stellar-shield-demo",
    wasmBuilt: true,
  });
}
