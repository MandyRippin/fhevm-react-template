"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHex = toHex;
exports.fromHex = fromHex;
exports.waitForTransaction = waitForTransaction;
exports.isAddress = isAddress;
function toHex(value) {
    return '0x' + value.toString(16);
}
function fromHex(hex) {
    return BigInt(hex);
}
async function waitForTransaction(provider, txHash) {
    const receipt = await provider.waitForTransaction(txHash);
    return receipt;
}
function isAddress(address) {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
}
