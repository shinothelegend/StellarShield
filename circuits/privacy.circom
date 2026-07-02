pragma circom 2.1.0;
include "../node_modules/circomlib/circuits/poseidon.circom";

template PrivacyPoolNote() {
    signal input secret;
    signal input nullifier;
    signal input commitment;
    signal output commitmentOut;
    signal output nullifierOut;

    component poseidonCommit = Poseidon(2);
    poseidonCommit.inputs[0] <== secret;
    poseidonCommit.inputs[1] <== nullifier;

    commitmentOut <== poseidonCommit.out;
    nullifierOut <== nullifier;

    commitment === poseidonCommit.out;
}

component main = PrivacyPoolNote();
