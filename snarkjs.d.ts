declare module "snarkjs" {
  export const groth16: {
    fullProve: (
      witness: Record<string, string>,
      wasm: Uint8Array,
      zkey: string,
    ) => Promise<{ proof: unknown; publicSignals: string[] }>;
  };
}
