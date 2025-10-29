export function toHex(value: bigint | number): string {
  return '0x' + value.toString(16);
}

export function fromHex(hex: string): bigint {
  return BigInt(hex);
}

export async function waitForTransaction(provider: any, txHash: string) {
  const receipt = await provider.waitForTransaction(txHash);
  return receipt;
}

export function isAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}
